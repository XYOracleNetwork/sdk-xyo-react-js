import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useLocation } from 'react-router-dom'

import { authDecorator, authServiceList, WrappedAuthComponent } from '../../../.storybook'
import { useAuthState } from '../../../contexts'
import { NoneSelected } from './NoneSelected'

const StorybookEntry = {
  argTypes: {},
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

  if (state && dispatch) {
    return (
      <NoneSelected
        dispatch={dispatch}
        loggedInAccount={state.loggedInAccount}
        authServiceList={state.authServiceList}
      />
    )
  } else {
    return <></>
  }
}

const TemplateWithRouterState: ComponentStory<WrappedAuthComponent> = () => {
  const { state, dispatch } = useAuthState()
  const location = useLocation()
  location.state = { message: 'Please login to view this page' }

  if (state && dispatch) {
    return (
      <NoneSelected
        dispatch={dispatch}
        loggedInAccount={state.loggedInAccount}
        authServiceList={state.authServiceList}
      />
    )
  } else {
    return <></>
  }
}

const Default = Template.bind({})
Default.args = {
  authState: {
    authServiceList,
  },
}

const LoggedIn = Template.bind({})
LoggedIn.args = {
  authState: {
    authServiceList,
    loggedInAccount: 'none@none.com',
  },
}

const WithRouterState = TemplateWithRouterState.bind({})
WithRouterState.args = {
  authState: {
    authServiceList,
  },
}

export { Default, LoggedIn, WithRouterState }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
