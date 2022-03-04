import { ComponentMeta, ComponentStory } from '@storybook/react'

import { authDecorator, WrappedAuthComponent } from '../../.storybook'
import { AuthServiceWrapper } from './AuthServiceWrapper'
import { AuthStatusIndicator } from './AuthStatusIndicator'

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
  title: 'Auth/AuthStatusIndicator',
} as ComponentMeta<WrappedAuthComponent>

const Template: ComponentStory<WrappedAuthComponent> = () => {
  return <AuthStatusIndicator></AuthStatusIndicator>
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

export { Default, LoggedInWeb2, LoggedInWeb3, NeedsReAuth }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
