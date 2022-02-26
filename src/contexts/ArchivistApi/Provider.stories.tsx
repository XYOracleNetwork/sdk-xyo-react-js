import { Typography } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useEffect, useState } from 'react'

import { authDecorator, authServiceList, WrappedAuthComponent } from '../../.storybook'
import { AuthServiceWrapper } from '../../components'
import { useAuthState } from '../Auth'
import { ArchivistApiProvider } from './Provider'
import { useArchivistApi } from './useArchivist'

interface ArchiveResponse {
  accessControl: boolean
  archive: string
  user: string
}

const StorybookEntry = {
  argTypes: {
    apiDomain: {
      default: 'http://localhost:8081',
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
  const [myArchives, setMyArchives] = useState<ArchiveResponse[]>([])
  const { api, currentToken } = useArchivistApi()
  const { jwtToken, loggedInAccount } = useAuthState().state
  const [successfulCall, setSuccessfulCall] = useState(false)

  useEffect(() => {
    if (jwtToken && currentToken && loggedInAccount) {
      api
        .getArchives()
        .then((archives) => {
          setMyArchives(archives)
          setSuccessfulCall(true)
        })
        .catch((e) => console.error(e))
    }
  }, [api, jwtToken, currentToken, loggedInAccount, setSuccessfulCall])

  useEffect(() => {
    if (!loggedInAccount) {
      setMyArchives([])
      setSuccessfulCall(false)
    }
  }, [loggedInAccount])

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
    </>
  )
}

const Template: ComponentStory<WrappedAuthComponent> = () => {
  const { jwtToken } = useAuthState().state
  return (
    <ArchivistApiProvider apiDomain="http://localhost:8081" jwtToken={jwtToken} archive="test">
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
