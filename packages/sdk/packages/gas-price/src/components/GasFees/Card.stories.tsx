import type { Meta, StoryFn } from '@storybook/react-vite'
import { FlexCol } from '@xylabs/react-flexbox'
import React from 'react'

import { GasFeeCard } from './Card.tsx'

const DefaultArgs = {
  gasPrice: 15.760_184_184_000_002,
  priorityFee: 1.0625,
}

export default {
  component: GasFeeCard,
  title: 'plugin/blockchain/GasPrice/GasFeeCard',
} as Meta

const Template: StoryFn<typeof GasFeeCard> = (props) => {
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

const WithLabel = Template.bind({})
WithLabel.args = {
  ...DefaultArgs,
  priorityFeeLabel: 'CustomPriorityFeeLabel',
  speed: 'CustomSpeedLabel',
}

export {
  Contained, Default, WithData, WithLabel,
}
