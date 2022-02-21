import { ComponentMeta, ComponentStory } from '@storybook/react'

import { authDecorator, authServiceList, WrappedAuthComponent } from '../../../.storybook'
import { useAuthState } from '../../../contexts'
import { NoneSelected } from './NoneSelected'

const StorybookEntry = {
  argTypes: {},
  component: NoneSelected,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Auth/NoneSelected',
} as ComponentMeta<typeof NoneSelected>

const Template: ComponentStory<WrappedAuthComponent> = () => {
  const { state, dispatch } = useAuthState()
  return (
    <NoneSelected dispatch={dispatch} loggedInAccount={state.loggedInAccount} authServiceList={state.authServiceList} />
  )
}

const Default = Template.bind({})
Default.args = {
  authState: {
    authServiceList,
  },
}
Default.decorators = [authDecorator]

const LoggedIn = Template.bind({})
LoggedIn.args = {
  authState: {
    authServiceList,
    loggedInAccount: 'none@none.com',
  },
}
LoggedIn.decorators = [authDecorator]

export { Default, LoggedIn }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
