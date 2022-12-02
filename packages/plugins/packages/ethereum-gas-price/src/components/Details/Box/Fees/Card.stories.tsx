import { ComponentStory, Meta } from '@storybook/react'
import { FlexCol } from '@xylabs/react-flexbox'

import { GasFeeCard } from './Card'

const DefaultArgs = {
  gasPrice: 15.760184184000002,
  priorityFee: 1.0625,
}

// eslint-disable-next-line import/no-default-export
export default {
  component: GasFeeCard,
  title: 'plugin/blockchain/EthereumGasPrice/GasFeeCard',
} as Meta

const Template: ComponentStory<typeof GasFeeCard> = (props) => {
  return <GasFeeCard {...props} />
}

const Default = Template.bind({})
Default.args = {}

const Contained = Template.bind({})
Contained.args = DefaultArgs
Contained.decorators = [
  (Story, args) => (
    <FlexCol alignItems="start">
      <Story {...args} />
    </FlexCol>
  ),
]

const WithData = Template.bind({})
WithData.args = DefaultArgs

export { Contained, Default, WithData }
