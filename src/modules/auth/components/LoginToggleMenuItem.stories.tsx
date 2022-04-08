import { ComponentMeta, ComponentStory } from '@storybook/react'

import { authDecorator, WrappedAuthComponent } from '../../../.storybook'
import { LoginToggleMenuItem, LoginToggleMenuItemProps } from './LoginToggleMenuItem'

const StorybookEntry = {
  argTypes: {
    authServiceList: [],
  },
  component: LoginToggleMenuItem,
  decorators: [authDecorator],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Auth/LoginToggleMenuItem',
} as ComponentMeta<WrappedAuthComponent & LoginToggleMenuItemProps>

const Template: ComponentStory<WrappedAuthComponent & LoginToggleMenuItemProps> = () => {
  return <LoginToggleMenuItem handleClose={() => alert('handled the click')}></LoginToggleMenuItem>
}

const LoggedIn = Template.bind({})
LoggedIn.args = {
  authState: {
    loggedInAccount: 'foo',
  },
}

const LoggedOut = Template.bind({})
LoggedOut.args = {
  authState: {},
}

export { LoggedIn, LoggedOut }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
