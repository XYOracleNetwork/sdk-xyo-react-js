/* eslint-disable import/no-internal-modules */
import { Toolbar, Typography } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { AuthServiceWrapper } from '@xyo-network/react-auth-service'
import { authDecorator, WrappedAuthComponent } from '@xyo-network/react-storybook'
import { Route, Routes, useLocation } from 'react-router-dom'

import { AuthStatusIconButton } from './AuthStatusIconButton'

const StorybookEntry = {
  argTypes: {
    authServiceList: [],
  },
  component: AuthServiceWrapper,
  decorators: [authDecorator],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Auth/AuthStatusIconButton',
} as ComponentMeta<WrappedAuthComponent>

const Template: ComponentStory<WrappedAuthComponent> = () => {
  return (
    <Toolbar>
      <AuthStatusIconButton />
    </Toolbar>
  )
}

const RoutedComponent = () => {
  const location = useLocation()
  return (
    <>
      <Typography>Routed to /login with state: </Typography>
      <pre>{JSON.stringify(location.state, null, 2)}</pre>
    </>
  )
}

const TemplateWithRouteState: ComponentStory<WrappedAuthComponent> = () => {
  const location = useLocation()
  location.state = { from: { pathname: window.location.pathname } }

  return (
    <>
      <Routes>
        <Route path="/login" element={<RoutedComponent />} />
      </Routes>
      <Toolbar>
        <AuthStatusIconButton />
      </Toolbar>
    </>
  )
}

const Default = Template.bind({})
Default.args = {
  authState: {
    authServiceList: [],
  },
}

const LoggedInWeb3 = Template.bind({})
LoggedInWeb3.args = {
  authState: {
    authServiceList: [],
    loggedInAccount: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  },
}

const LoggedInWeb2 = Template.bind({})
LoggedInWeb2.args = {
  authState: {
    authServiceList: [],
    loggedInAccount: 'test1234@somedomain.com',
  },
}

const NeedsReAuth = Template.bind({})
NeedsReAuth.args = {
  authState: {
    authServiceList: [],
    reAuthenticate: true,
  },
}

const WithRouteState = TemplateWithRouteState.bind({})
NeedsReAuth.args = {
  authState: {
    authServiceList: [],
    reAuthenticate: true,
  },
}

export { Default, LoggedInWeb2, LoggedInWeb3, NeedsReAuth, WithRouteState }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
