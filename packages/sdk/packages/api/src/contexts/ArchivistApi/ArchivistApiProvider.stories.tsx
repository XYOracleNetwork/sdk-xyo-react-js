/* eslint-disable import/no-internal-modules */
import { Typography } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoArchive } from '@xyo-network/api'
import { useAuthState } from '@xyo-network/react-auth'
import { AuthServiceWrapper } from '@xyo-network/react-auth-service'
import { authDecorator, WrappedAuthComponent } from '@xyo-network/react-storybook'
import { useEffect, useState } from 'react'

import { ApiProvider } from './Provider'
import { useApi } from './use'

const StorybookEntry = {
  argTypes: {
    apiDomain: {
      default: 'https://beta.api.archivist.xyo.network',
    },
  },
  component: ApiProvider,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'archivist-api/ArchivistApiProvider',
} as ComponentMeta<WrappedAuthComponent>

const DemoArchiveFetcher = () => {
  const [myArchives, setMyArchives] = useState<XyoArchive[]>([])
  const { api, currentToken, responseHistory } = useApi()
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
    [api, state?.jwtToken, currentToken, state?.loggedInAccount, setSuccessfulCall],
  )

  useEffect(() => {
    if (!state?.loggedInAccount) {
      setMyArchives([])
      setSuccessfulCall(false)
    }
  }, [state?.loggedInAccount])

  return (
    <>
      <AuthServiceWrapper />
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
    <ApiProvider
      errorHistoryMaxDepth={10}
      successHistoryMaxDepth={10}
      failureHistoryMaxDepth={10}
      responseHistoryMaxDepth={10}
      apiDomain="https://beta.api.archivist.xyo.network"
      jwtToken={jwtToken}
    >
      <DemoArchiveFetcher />
    </ApiProvider>
  )
}

const Default = Template.bind({})
Default.args = {}
Default.decorators = [authDecorator]

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
