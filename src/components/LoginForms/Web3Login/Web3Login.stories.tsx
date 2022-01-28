import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FlexGrowCol } from '@xylabs/sdk-react'
import { BrowserRouter } from 'react-router-dom'

import { AuthApiLoader, AuthLoader, AuthServiceId } from '../../../contexts'
import { Web3Login } from './Web3Login'

const StorybookEntry = {
  argTypes: {},
  component: Web3Login,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Auth/Web3Login',
} as ComponentMeta<typeof Web3Login>

const Template: ComponentStory<typeof Web3Login> = (args) => {
  const authServiceList = [
    {
      id: AuthServiceId.Web3Wallet,
      title: 'Web3 wallet',
    },
  ]
  const apiDomain = 'http://localhost:8080'

  return (
    <BrowserRouter>
      <AuthLoader authServiceList={authServiceList}>
        <AuthApiLoader apiDomain={apiDomain}>
          <Web3Login {...args}></Web3Login>
        </AuthApiLoader>
      </AuthLoader>
    </BrowserRouter>
  )
}

const Default = Template.bind({})
Default.args = {}
Default.decorators = [
  (Story) => (
    <FlexGrowCol marginY={2} justifyContent="flex-start" alignItems="center">
      <Story />
    </FlexGrowCol>
  ),
]

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
