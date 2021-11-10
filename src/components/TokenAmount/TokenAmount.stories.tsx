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
  amount: new BigNumber(5).shln(18),
}

const WithLogo = Template.bind({})
WithLogo.args = {
  amount: new BigNumber(5).shln(18),
  logo: true,
}

export { Default, WithLogo }

export default StorybookEntry
