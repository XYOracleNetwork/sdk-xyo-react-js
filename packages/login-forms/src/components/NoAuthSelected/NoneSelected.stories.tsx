/* eslint-disable import/no-internal-modules */
import { Alert, AlertTitle } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useAuthService, useAuthState } from '@xyo-network/react-auth'
import { useLocation } from 'react-router-dom'

import { authDecorator, WrappedAuthComponent } from '../../../../../.storybook'
import { NoneSelected } from './NoneSelected'

const StorybookEntry = {
  args: {},
  component: NoneSelected,
  decorators: [authDecorator],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Auth/NoneSelected',
} as ComponentMeta<typeof NoneSelected>

const Template: ComponentStory<WrappedAuthComponent> = () => {
  const { state, dispatch } = useAuthState()
  const { activeAuthServiceId } = useAuthService()

  if (state && dispatch) {
    return (
      <>
        <Alert>
          <AlertTitle>Active Auth Service Id</AlertTitle>
          {activeAuthServiceId}
        </Alert>
        <NoneSelected dispatch={dispatch} loggedInAccount={state.loggedInAccount} />
      </>
    )
  } else {
    return <h1>State and dispatch missing from authState</h1>
  }
}

const TemplateWithRouterState: ComponentStory<WrappedAuthComponent> = () => {
  const { state, dispatch } = useAuthState()
  const { activeAuthServiceId } = useAuthService()
  const location = useLocation()
  location.state = { message: 'Please login to view this page' }

  if (state && dispatch) {
    return (
      <>
        <Alert>
          <AlertTitle>Active Auth Service Id</AlertTitle>
          {activeAuthServiceId}
        </Alert>
        <NoneSelected dispatch={dispatch} loggedInAccount={state.loggedInAccount} />
      </>
    )
  } else {
    return <h1>State and dispatch missing from authState</h1>
  }
}

const Default = Template.bind({})
Default.args = {}

const LoggedIn = Template.bind({})
LoggedIn.args = {
  authState: {
    loggedInAccount: 'none@none.com',
  },
}

const WithRouterState = TemplateWithRouterState.bind({})
WithRouterState.args = {}

export { Default, LoggedIn, WithRouterState }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
