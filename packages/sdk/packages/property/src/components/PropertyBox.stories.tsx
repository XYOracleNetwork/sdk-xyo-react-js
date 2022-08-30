import ReplayIcon from '@mui/icons-material/Replay'
import { TextField } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { sampleBlockWithPayloads, useAppThemeDecorator } from '@xyo-network/react-storybook'

import { Property } from './Property'

const StorybookEntry = {
  argTypes: {},
  component: Property,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'property/PropertyBox',
} as ComponentMeta<typeof Property>

const Template: ComponentStory<typeof Property> = (args) => <Property {...args} paper={false}></Property>

const TemplateWithCompare: ComponentStory<typeof Property> = (args) => (
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
Default.decorators = [useAppThemeDecorator]

const WithTitle = Template.bind({})
WithTitle.args = { title: 'No Data' }
WithTitle.decorators = [useAppThemeDecorator]

const WithUndefinedData = Template.bind({})
WithUndefinedData.args = { title: 'Block Hash' }
WithUndefinedData.decorators = [useAppThemeDecorator]

const WithData = Template.bind({})
WithData.args = { title: 'Block Hash', value: sampleBlockWithPayloads._hash }
WithData.decorators = [useAppThemeDecorator]

const WithDataSmall = Template.bind({})
WithDataSmall.args = { size: 'small', title: 'Block Hash', value: sampleBlockWithPayloads._hash }
WithDataSmall.decorators = [useAppThemeDecorator]

const WithDataCompare = TemplateWithCompare.bind({})
WithDataCompare.args = { tip: 'This is the block hash', title: 'Block Hash', value: sampleBlockWithPayloads._hash }
WithDataCompare.decorators = [useAppThemeDecorator]

const WithDataAndBadgeSmall = Template.bind({})
WithDataAndBadgeSmall.args = { badge: true, size: 'small', tip: 'This is the block hash', title: 'Block Hash', value: sampleBlockWithPayloads._hash }
WithDataAndBadgeSmall.decorators = [useAppThemeDecorator]

const WithDataAndBadgeMedium = Template.bind({})
WithDataAndBadgeMedium.args = {
  badge: true,
  size: 'medium',
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: sampleBlockWithPayloads._hash,
}
WithDataAndBadgeMedium.decorators = [useAppThemeDecorator]

const WithDataAndBadgeLarge = Template.bind({})
WithDataAndBadgeLarge.args = { badge: true, size: 'large', tip: 'This is the block hash', title: 'Block Hash', value: sampleBlockWithPayloads._hash }
WithDataAndBadgeLarge.decorators = [useAppThemeDecorator]

const WithTip = Template.bind({})
WithTip.args = {
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: sampleBlockWithPayloads._hash,
}
WithTip.decorators = [useAppThemeDecorator]

const WithTipAndBadge = Template.bind({})
WithTipAndBadge.args = {
  badge: true,
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: sampleBlockWithPayloads._hash,
}
WithTipAndBadge.decorators = [useAppThemeDecorator]

const WithActions = Template.bind({})
WithActions.args = {
  actions: [{ name: 'ActionOne' }, { name: 'ActionTwo' }],
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: sampleBlockWithPayloads._hash,
}
WithActions.decorators = [useAppThemeDecorator]

const LargeWithValue = Template.bind({})
LargeWithValue.args = {
  badge: true,
  size: 'large',
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: sampleBlockWithPayloads._hash,
}
LargeWithValue.decorators = [useAppThemeDecorator]

const LargeWithValueAndActions = Template.bind({})
LargeWithValueAndActions.args = {
  actions: [{ icon: <ReplayIcon />, name: 'ActionOne' }, { name: 'ActionTwo' }],
  badge: true,
  size: 'large',
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: sampleBlockWithPayloads._hash,
}
LargeWithValueAndActions.decorators = [useAppThemeDecorator]

const SmallWithValueAndActions = Template.bind({})
SmallWithValueAndActions.args = {
  actions: [{ icon: <ReplayIcon />, name: 'ActionOne' }, { name: 'ActionTwo' }],
  badge: true,
  size: 'small',
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: sampleBlockWithPayloads._hash,
}
SmallWithValueAndActions.decorators = [useAppThemeDecorator]

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

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
