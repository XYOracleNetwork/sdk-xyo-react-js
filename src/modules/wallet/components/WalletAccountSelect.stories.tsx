import { ComponentMeta, ComponentStory } from '@storybook/react'

import { WalletAccountSelect } from './WalletAccountSelect'

const StorybookEntry = {
  argTypes: {},
  component: WalletAccountSelect,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'wallet/WalletSelect',
} as ComponentMeta<typeof WalletAccountSelect>

const Template: ComponentStory<typeof WalletAccountSelect> = (args) => {
  return <WalletAccountSelect {...args}></WalletAccountSelect>
}

const Default = Template.bind({})
Default.args = {}

const WithPhrase = Template.bind({})
WithPhrase.args = { phrase: 'arie test' }

export { Default, WithPhrase }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
