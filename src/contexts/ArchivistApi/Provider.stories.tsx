import { Typography } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useEffect, useState } from 'react'

import { authDecorator, authServiceList, WrappedAuthComponent } from '../../.storybook'
import { AuthServiceWrapper } from '../../components'
import { useAuthState } from '../Auth'
import { ArchivistApiLoader } from './Provider'
import { useArchivistApi } from './useArchivist'

const StorybookEntry = {
  argTypes: {
    apiDomain: {
      default: 'http://localhost:8081',
    },
    authServiceList: {
      default: authServiceList,
    },
  },
  component: ArchivistApiLoader,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Archivist/ArchivistApiLoader',
} as ComponentMeta<WrappedAuthComponent>

const DemoArchiveFetcher = () => {
  const [myArchives, setMyArchives] = useState<string[]>([])
  const { api, currentToken } = useArchivistApi()
  const { jwtToken, isLoggedIn } = useAuthState().state
  const [successfulCall, setSuccessfulCall] = useState(false)

  useEffect(() => {
    if (jwtToken && currentToken && isLoggedIn) {
      api
        .getArchives()
        .then((archives) => {
          setMyArchives(archives)
          setSuccessfulCall(true)
        })
        .catch((e) => console.error(e))
    }
  }, [api, jwtToken, currentToken, isLoggedIn, setSuccessfulCall])

  useEffect(() => {
    if (!isLoggedIn) {
      setMyArchives([])
      setSuccessfulCall(false)
    }
  }, [isLoggedIn])

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
        {myArchives.map((archive) => (
          <li key={archive}>{archive}</li>
        ))}
      </ul>
    </>
  )
}

const Template: ComponentStory<WrappedAuthComponent> = () => {
  const { jwtToken } = useAuthState().state
  return (
    <ArchivistApiLoader apiDomain="http://localhost:8081" jwtToken={jwtToken} archive="test">
      <DemoArchiveFetcher />
    </ArchivistApiLoader>
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
