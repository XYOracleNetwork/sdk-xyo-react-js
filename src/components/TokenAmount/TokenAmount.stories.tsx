import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BigNumber } from '@xyo-network/sdk-xyo-js'

import TokenAmount from './TokenAmount'

const StorybookEntry = {
  argTypes: {},
  component: TokenAmount,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'TokenAmount',
} as ComponentMeta<typeof TokenAmount>

const Template: ComponentStory<typeof TokenAmount> = (args) => <TokenAmount {...args}></TokenAmount>

const Default = Template.bind({})
Default.args = {
  amount: new BigNumber('1195c751dbcc90ab4200000', 16),
}

const WithLogo = Template.bind({})
WithLogo.args = {
  amount: new BigNumber('1195c751dbcc90ab4200000', 16),
  logo: true,
}

const WithLabel = Template.bind({})
WithLabel.args = {
  amount: new BigNumber('1195c751dbcc90ab4200000', 16),
  label: 'Balance',
}

const WithLogoAndLabel = Template.bind({})
WithLogoAndLabel.args = {
  amount: new BigNumber('1195c751dbcc90ab4200000', 16),
  label: 'Balance',
  logo: true,
}

export { Default, WithLabel, WithLogo, WithLogoAndLabel }

export default StorybookEntry
