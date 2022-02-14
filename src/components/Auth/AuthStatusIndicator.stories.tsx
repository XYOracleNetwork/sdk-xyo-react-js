import { ComponentMeta, ComponentStory } from '@storybook/react'

import { authDecorator, authServiceList, WrappedAuthComponent } from '../../.storybook'
import { AuthServiceWrapper } from './AuthServiceWrapper'
import { AuthStatusIndicator } from './AuthStatusIndicator'

const StorybookEntry = {
  argTypes: {
    authServiceList: [],
  },
  component: AuthServiceWrapper,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Auth/AuthStatusIndicator',
} as ComponentMeta<WrappedAuthComponent>

const Template: ComponentStory<WrappedAuthComponent> = () => {
  return <AuthStatusIndicator></AuthStatusIndicator>
}

const Default = Template.bind({})
Default.args = {
  authState: {
    authServiceList: [],
    isLoggedIn: false,
  },
}
Default.decorators = [authDecorator]

const LoggedInWeb3 = Template.bind({})
LoggedInWeb3.args = {
  authState: {
    authServiceList: [],
    isLoggedIn: true,
    loggedInAccount: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  },
}
LoggedInWeb3.decorators = [authDecorator]

const LoggedInWeb2 = Template.bind({})
LoggedInWeb2.args = {
  authState: {
    authServiceList: [],
    isLoggedIn: true,
    loggedInAccount: 'test1234@somedomain.com',
  },
}
LoggedInWeb2.decorators = [authDecorator]

export { Default, LoggedInWeb2, LoggedInWeb3 }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
