/* eslint-disable import/no-deprecated */
/* eslint-disable deprecation/deprecation */
import { Alert, Typography } from '@mui/material'
import { ComponentStory, Meta } from '@storybook/react'
import { ButtonEx } from '@xylabs/react-button'
import { FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { Huri } from '@xyo-network/huri'
import { NetworkMemoryProvider } from '@xyo-network/react-network'
import { XyoSchemaCache } from '@xyo-network/utils'
import { lazy, Suspense, useState } from 'react'

import { ApiProvider } from '../contexts'
import { FetchHuriHashOptions } from './lib'
import { useHuriHashViaApi } from './useHuriHash'

const JsonView = lazy(() => import(/* webpackChunkName: "jsonView" */ 'react-json-view'))

interface UseHuriHashComponentProps {
  huriOrHash: string | Huri
  huriUri?: string
  options?: FetchHuriHashOptions
  reTestable?: boolean
}

const apiDomain = 'https://beta.api.archivist.xyo.network'
const hash = '5605fabad11b10bb5fb86b309ca0970894eda8f22362dda1a489817723bca992'
XyoSchemaCache.instance.proxy = `${apiDomain}/domain`

const mainApiDomain = 'https://api.archivist.xyo.network'
const mainHash = 'd3a3936e31ba1d835c528784ab77c1eaaeedd6e16b7aad68a88241ce539853cb'

const Wrapper: React.FC<UseHuriHashComponentProps> = (props) => (
  <NetworkMemoryProvider>
    <ApiProvider apiDomain={apiDomain}>
      <UseHuriHashComponent {...props} />
    </ApiProvider>
  </NetworkMemoryProvider>
)

const UseHuriHashComponent: React.FC<UseHuriHashComponentProps> = ({ huriOrHash, huriUri, options, reTestable }) => {
  const [trigger, setTrigger] = useState<string | Huri>(huriOrHash)
  const [payload, notFound, , networkNotFound] = useHuriHashViaApi(trigger, huriUri, options)

  return (
    <>
      <Typography variant="body1" fontWeight="bold">
        Fetches the payload for a huriOrHash.
      </Typography>
      {reTestable ? (
        <FlexRow columnGap={2}>
          <ButtonEx variant="contained" onClick={() => setTrigger(hash)}>
            Fetch Valid Hash
          </ButtonEx>
          <ButtonEx variant="contained" onClick={() => setTrigger('foo')}>
            Hash Not Found
          </ButtonEx>
        </FlexRow>
      ) : null}
      <FlexCol my={3}>
        {notFound === undefined && networkNotFound === undefined ? 'Loading...' : null}
        {notFound ? <Alert severity="warning">Not Found</Alert> : null}
        {networkNotFound ? <Alert severity="warning">Network Not Found</Alert> : null}
        <Suspense fallback={<FlexCol busy />}>
          <JsonView src={payload || {}} />
        </Suspense>
      </FlexCol>
    </>
  )
}

const StorybookEntry: Meta = {
  argTypes: {},
  component: UseHuriHashComponent,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'payload/useHuriHash',
}

const Template: ComponentStory<typeof UseHuriHashComponent> = (props) => {
  return <Wrapper {...props} />
}

const Default = Template.bind({})
Default.args = { huriOrHash: hash }

const NotFound = Template.bind({})
NotFound.args = { huriOrHash: 'foo', reTestable: true }

const WithHuri = Template.bind({})
WithHuri.args = { huriOrHash: new Huri(`${apiDomain}/${hash}`) }

const WithHuriUri = Template.bind({})
WithHuriUri.args = { huriUri: `${mainApiDomain}/${mainHash}` }

const WithHuriUriNetworkNotFound = Template.bind({})
WithHuriUriNetworkNotFound.args = { huriUri: `http://badarchivisturl.com/${mainHash}` }

// Note - story will work correctly once main net return 200 instead of 404 when payloads aren't found
// Resolve huriUri when network is different from the current network
const WithHuriUriNotFound = Template.bind({})
WithHuriUriNotFound.args = { huriUri: `${mainApiDomain}/foo` }

export { Default, NotFound, WithHuri, WithHuriUri, WithHuriUriNetworkNotFound, WithHuriUriNotFound }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
