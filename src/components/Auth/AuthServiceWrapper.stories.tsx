import { ComponentMeta, ComponentStory } from '@storybook/react'

import { authDecorator, authServiceList, WrappedAuthComponent } from '../.storybook'
import { AuthServiceWrapper } from './AuthServiceWrapper'

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
  title: 'Auth/AuthServiceWrapper',
} as ComponentMeta<typeof AuthServiceWrapper>

const Template: ComponentStory<WrappedAuthComponent> = () => {
  return <AuthServiceWrapper></AuthServiceWrapper>
}

const Default = Template.bind({})
Default.args = {
  authState: {
    authServiceList: [authServiceList[0]],
  },
}
Default.decorators = [authDecorator]

const FullAuthServiceList = Template.bind({})
FullAuthServiceList.args = {
  authState: {
    authServiceList,
  },
}
FullAuthServiceList.decorators = [authDecorator]

const ErrorState = Template.bind({})
ErrorState.args = {
  authState: {
    apiDomain: 'http://bogus.domain',
    authServiceList,
  },
}
ErrorState.decorators = [authDecorator]

export { Default, ErrorState, FullAuthServiceList }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
