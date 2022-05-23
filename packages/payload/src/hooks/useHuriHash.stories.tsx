import { Typography } from '@mui/material'
import { ComponentStory, Meta } from '@storybook/react'
import { FlexCol } from '@xylabs/sdk-react'
import { Huri } from '@xyo-network/core'
import { ArchivistApiProvider } from '@xyo-network/react-archivist-api'
import { XyoSchemaCache } from '@xyo-network/utils'
import { lazy, Suspense } from 'react'

import { useHuriHash } from './useHuriHash'

const JsonView = lazy(() => import(/* webpackChunkName: "jsonView" */ 'react-json-view'))

interface UseHuriHashComponentProps {
  huriOrHash: string | Huri
}

const apiDomain = 'https://beta.api.archivist.xyo.network'
const hash = '5605fabad11b10bb5fb86b309ca0970894eda8f22362dda1a489817723bca992'
XyoSchemaCache.instance.proxy = `${apiDomain}/domain`

const Wrapper: React.FC<UseHuriHashComponentProps> = ({ huriOrHash }) => (
  <ArchivistApiProvider apiDomain={apiDomain}>
    <UseHuriHashComponent huriOrHash={huriOrHash} />
  </ArchivistApiProvider>
)

const UseHuriHashComponent: React.FC<UseHuriHashComponentProps> = ({ huriOrHash }) => {
  const [payload] = useHuriHash(huriOrHash)

  return (
    <>
      <Typography variant="body1" fontWeight="bold">
        Fetches the payload for a huriOrHash.
      </Typography>
      <FlexCol my={3}>
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
  title: 'hooks/useHuriHash',
}

const Template: ComponentStory<typeof UseHuriHashComponent> = ({ huriOrHash }) => {
  return <Wrapper huriOrHash={huriOrHash} />
}

const Default = Template.bind({})
Default.args = { huriOrHash: hash }

const WithHuri = Template.bind({})
WithHuri.args = { huriOrHash: new Huri(`${apiDomain}/${hash}`) }

export { Default, WithHuri }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
