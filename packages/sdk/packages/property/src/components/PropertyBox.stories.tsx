import { Replay as ReplayIcon } from '@mui/icons-material'
import { TextField } from '@mui/material'
import type { Meta, StoryFn } from '@storybook/react'
import { FlexCol, FlexRow } from '@xylabs/react-flexbox'
import React from 'react'

import { Property } from './Property.tsx'
import type { PropertyProps } from './Props.ts'

const StorybookEntry = {
  argTypes: {},
  component: Property,
  parameters: { docs: { page: null } },
  title: 'property/PropertyBox',
} as Meta<typeof Property>

const Template: StoryFn = (args: PropertyProps) => <Property {...args} paper={false}></Property>

const TemplateWithCompare: StoryFn = (args: PropertyProps) => (
  <FlexCol gap={1} alignItems="stretch">
    <FlexRow gap={1}>
      <TextField size="small" value="Sample text Field" />
      <Property {...args} size="small"></Property>
    </FlexRow>
    <FlexRow gap={1}>
      <Property {...args} size="small"></Property>
      <Property {...args} size="small"></Property>
    </FlexRow>
    <FlexRow gap={1}>
      <TextField size="medium" value="Sample text Field" />
      <Property {...args} size="medium"></Property>
    </FlexRow>
    <FlexRow gap={1}>
      <Property {...args} size="medium"></Property>
      <Property {...args} size="medium"></Property>
    </FlexRow>
    <FlexRow gap={1}>
      <TextField value="Sample text Field" />
      <Property {...args} size="large"></Property>
    </FlexRow>
    <FlexRow gap={1}>
      <Property {...args} size="large"></Property>
      <Property {...args} size="large"></Property>
    </FlexRow>
  </FlexCol>
)

const Default = Template.bind({})
Default.args = {}

const WithTitle = Template.bind({})
WithTitle.args = { title: 'No Data' }

const WithUndefinedData = Template.bind({})
WithUndefinedData.args = { title: 'Block Hash' }

const WithData = Template.bind({})
WithData.args = {
  title: 'Block Hash',
  // value: await PayloadBuilder.dataHash(sampleBlock)
}

const WithDataSmall = Template.bind({})
WithDataSmall.args = {
  size: 'small',
  title: 'Block Hash',
  // value: await PayloadBuilder.dataHash(sampleBlock)
}

const WithDataCompare = TemplateWithCompare.bind({})
WithDataCompare.args = {
  tip: 'This is the block hash',
  title: 'Block Hash',
  // value: await PayloadBuilder.dataHash(sampleBlock),
}

const WithDataAndBadgeSmall = Template.bind({})
WithDataAndBadgeSmall.args = {
  badge: true,
  size: 'small',
  tip: 'This is the block hash',
  title: 'Block Hash',
  // value: await PayloadBuilder.dataHash(sampleBlock),
}

const WithDataAndBadgeMedium = Template.bind({})
WithDataAndBadgeMedium.args = {
  badge: true,
  size: 'medium',
  tip: 'This is the block hash',
  title: 'Block Hash',
  // value: await PayloadBuilder.dataHash(sampleBlock),
}

const WithDataAndBadgeLarge = Template.bind({})
WithDataAndBadgeLarge.args = {
  badge: true,
  size: 'large',
  tip: 'This is the block hash',
  title: 'Block Hash',
  // value: await PayloadBuilder.dataHash(sampleBlock),
}

const WithTip = Template.bind({})
WithTip.args = {
  tip: 'This is the block hash',
  title: 'Block Hash',
  // value: await PayloadBuilder.dataHash(sampleBlock),
}

const WithTipAndBadge = Template.bind({})
WithTipAndBadge.args = {
  badge: true,
  tip: 'This is the block hash',
  title: 'Block Hash',
  // value: await PayloadBuilder.dataHash(sampleBlock),
}

const WithActions = Template.bind({})
WithActions.args = {
  actions: [{ name: 'ActionOne' }, { name: 'ActionTwo' }],
  tip: 'This is the block hash',
  title: 'Block Hash',
  // value: await PayloadBuilder.dataHash(sampleBlock),
}

const LargeWithValue = Template.bind({})
LargeWithValue.args = {
  badge: true,
  size: 'large',
  tip: 'This is the block hash',
  title: 'Block Hash',
  // value: await PayloadBuilder.dataHash(sampleBlock),
}

const LargeWithValueAndActions = Template.bind({})
LargeWithValueAndActions.args = {
  actions: [{ icon: <ReplayIcon />, name: 'ActionOne' }, { name: 'ActionTwo' }],
  badge: true,
  size: 'large',
  tip: 'This is the block hash',
  title: 'Block Hash',
  // value: await PayloadBuilder.dataHash(sampleBlock),
}

const SmallWithValueAndActions = Template.bind({})
SmallWithValueAndActions.args = {
  actions: [{ icon: <ReplayIcon />, name: 'ActionOne' }, { name: 'ActionTwo' }],
  badge: true,
  size: 'small',
  tip: 'This is the block hash',
  title: 'Block Hash',
  // value: await PayloadBuilder.dataHash(sampleBlock),
}

export {
  Default,
  LargeWithValue,
  LargeWithValueAndActions,
  SmallWithValueAndActions,
  WithActions,
  WithData,
  WithDataAndBadgeLarge,
  WithDataAndBadgeMedium,
  WithDataAndBadgeSmall,
  WithDataCompare,
  WithDataSmall,
  WithTip,
  WithTipAndBadge,
  WithUndefinedData,
}

export default StorybookEntry
