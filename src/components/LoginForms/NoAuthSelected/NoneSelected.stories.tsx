import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FlexGrowCol } from '@xylabs/sdk-react'
import { BrowserRouter } from 'react-router-dom'

import { AuthApiLoader, AuthLoader, AuthServiceId } from '../../../contexts'
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

const Template: ComponentStory<typeof NoneSelected> = (args) => {
  const authServiceList = [
    {
      id: AuthServiceId.EmailPassword,
      title: 'Email and Password',
    },
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
          <NoneSelected {...args}></NoneSelected>
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
