import { Meta, StoryFn } from '@storybook/react'
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
} as Meta<typeof WalletAccountDetails>

const Template: StoryFn<typeof WalletAccountDetails> = (args) => {
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
