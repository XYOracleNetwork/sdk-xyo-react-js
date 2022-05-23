import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { WalletAccountDetails } from './WalletAccountDetails'

const StorybookEntry = {
  argTypes: {},
  component: WalletAccountDetails,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'wallet/WalletAccountDetails',
} as ComponentMeta<typeof WalletAccountDetails>

const Template: ComponentStory<typeof WalletAccountDetails> = (args) => {
  return (
    <BrowserRouter>
      <WalletAccountDetails {...args}></WalletAccountDetails>
    </BrowserRouter>
  )
}

const Default = Template.bind({})
Default.args = {}

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
