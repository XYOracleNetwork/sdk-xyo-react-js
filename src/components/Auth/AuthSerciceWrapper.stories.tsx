import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FlexGrowCol } from '@xylabs/sdk-react'
import { BrowserRouter } from 'react-router-dom'

import { AuthApiLoader, AuthLoader, AuthServiceId, IAuthService } from '../../contexts'
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

interface WrappedArgs {
  authServiceList: IAuthService[]
}
type WrappedAuthServiceWrapper = (props: WrappedArgs) => React.ReactElement

const Template: ComponentStory<WrappedAuthServiceWrapper> = (args) => {
  const apiDomain = 'http://localhost:8080'
  const { authServiceList } = args
  return (
    <BrowserRouter>
      <AuthLoader authServiceList={authServiceList}>
        <AuthApiLoader apiDomain={apiDomain}>
          <AuthServiceWrapper></AuthServiceWrapper>
        </AuthApiLoader>
      </AuthLoader>
    </BrowserRouter>
  )
}

const commonDecorator = (Story) => (
  <FlexGrowCol marginY={2} justifyContent="flex-start" alignItems="center">
    <Story />
  </FlexGrowCol>
)

const Default = Template.bind({})
Default.args = {
  authServiceList: [
    {
      id: AuthServiceId.Web3Wallet,
      title: 'Web3 wallet',
    },
  ],
}
Default.decorators = [commonDecorator]

const FullAuthServiceList = Template.bind({})
FullAuthServiceList.args = {
  authServiceList: [
    {
      id: AuthServiceId.Web3Wallet,
      title: 'Web3 wallet',
    },
    {
      id: AuthServiceId.EmailPassword,
      title: 'Email and Password',
    },
  ],
}
FullAuthServiceList.decorators = [commonDecorator]

export { Default, FullAuthServiceList }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
