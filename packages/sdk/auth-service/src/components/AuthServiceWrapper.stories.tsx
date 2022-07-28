import { ComponentStory, Meta } from '@storybook/react'
import { AuthService, authServiceList } from '@xyo-network/react-auth'
import { authDecorator, WrappedAuthComponent } from '@xyo-network/react-storybook'

import { AuthServiceWrapper } from './AuthServiceWrapper'

type Combined = ComponentStory<typeof AuthServiceWrapper> & ComponentStory<WrappedAuthComponent>

const StorybookEntry: Meta = {
  argTypes: {},
  component: AuthServiceWrapper,
  decorators: [authDecorator],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'auth-service/AuthServiceWrapper',
}

const Template: Combined = (props) => {
  const combinedProps = props as Combined['argTypes']
  return <AuthServiceWrapper authServiceListOverride={combinedProps?.authServiceListOverride as AuthService[]} />
}

const Default = Template.bind({})
Default.args = {}

const FullAuthServiceList = Template.bind({})
FullAuthServiceList.args = { authServiceListOverride: authServiceList }

const ErrorState = Template.bind({})
ErrorState.args = {
  authState: {
    apiDomain: 'http://bogus.domain',
  },
}

export { Default, ErrorState, FullAuthServiceList }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
