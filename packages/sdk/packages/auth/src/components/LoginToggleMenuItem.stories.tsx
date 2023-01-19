import { ComponentStory, Meta } from '@storybook/react'

import { LoginToggleMenuItem, LoginToggleMenuItemProps } from './LoginToggleMenuItem'

const StorybookEntry = {
  argTypes: {
    authServiceList: [],
  },
  component: LoginToggleMenuItem,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Auth/LoginToggleMenuItem',
} as Meta

const Template: ComponentStory<React.FC<LoginToggleMenuItemProps & { authState?: { loggedInAccount?: string } }>> = () => {
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
