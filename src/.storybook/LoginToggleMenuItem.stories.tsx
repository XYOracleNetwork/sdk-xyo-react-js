import { ComponentMeta, ComponentStory } from '@storybook/react'
import { LoginToggleMenuItem, LoginToggleMenuItemProps } from '../../packages/auth/src/components/LoginToggleMenuItem'
import { authDecorator, WrappedAuthComponent } from './authHelpers'

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
