import { Typography } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/sdk-react'
import { XyoArchive } from '@xyo-network/sdk-xyo-client-js'
import { useEffect, useState } from 'react'

import { authDecorator, authServiceList, WrappedAuthComponent } from '../../.storybook'
import { AuthServiceWrapper } from '../../components'
import { useAuthState } from '../Auth'
import { ArchivistApiProvider } from './Provider'
import { useArchivistApi } from './useArchivist'

const StorybookEntry = {
  argTypes: {
    apiDomain: {
      default: 'https://beta.api.archivist.xyo.network',
    },
    authServiceList: {
      default: authServiceList,
    },
  },
  component: ArchivistApiProvider,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Archivist/ArchivistApiProvider',
} as ComponentMeta<WrappedAuthComponent>

const DemoArchiveFetcher = () => {
  const [myArchives, setMyArchives] = useState<XyoArchive[]>([])
  const { api, currentToken, responseHistory } = useArchivistApi()
  const { state } = useAuthState()
  const [successfulCall, setSuccessfulCall] = useState(false)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (state?.jwtToken && currentToken && state?.loggedInAccount) {
        const archives = await api?.archives?.get()
        if (archives && mounted()) {
          setMyArchives(archives)
          setSuccessfulCall(true)
        }
      }
    },
    [api, state?.jwtToken, currentToken, state?.loggedInAccount, setSuccessfulCall]
  )

  useEffect(() => {
    if (!state?.loggedInAccount) {
      setMyArchives([])
      setSuccessfulCall(false)
    }
  }, [state?.loggedInAccount])

  return (
    <>
      <AuthServiceWrapper></AuthServiceWrapper>
      <p>My Archives</p>
      {successfulCall && (
        <Typography color="success.main" variant="body1">
          Successfully made authenticated request!!
        </Typography>
      )}
      <ul>
        {myArchives.map((archive, index) => (
          <li key={index}>{archive.archive}</li>
        ))}
      </ul>
      <Typography variant="h6">Responses</Typography>
      {responseHistory?.map((response, index) => (
        <Typography key={index} variant="body1">
          {response.status}
        </Typography>
      ))}
    </>
  )
}

const Template: ComponentStory<WrappedAuthComponent> = () => {
  const { state } = useAuthState()
  const jwtToken = state?.jwtToken
  return (
    <ArchivistApiProvider
      errorHistoryMaxDepth={10}
      successHistoryMaxDepth={10}
      failureHistoryMaxDepth={10}
      responseHistoryMaxDepth={10}
      apiDomain="https://beta.api.archivist.xyo.network"
      jwtToken={jwtToken}
    >
      <DemoArchiveFetcher />
    </ArchivistApiProvider>
  )
}

const Default = Template.bind({})
Default.args = {
  authState: {
    authServiceList,
  },
}
Default.decorators = [authDecorator]

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
