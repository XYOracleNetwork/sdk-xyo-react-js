import { Replay as ReplayIcon } from '@mui/icons-material'
import { TextField } from '@mui/material'
import type { Meta, StoryFn } from '@storybook/react-vite'
import { FlexCol, FlexRow } from '@xylabs/react-flexbox'
import React from 'react'

import { Property } from './Property.tsx'
import type { PropertyPaperProps, PropertyProps } from './Props.ts'

const StorybookEntry = {
  argTypes: {},
  component: Property,
  parameters: { docs: { page: null } },
  title: 'property/PropertyPaper',
} as Meta<typeof Property>

const Template: StoryFn = (args: PropertyProps) => <Property {...(args as PropertyPaperProps)} paper={true}></Property>

const TemplateWithCompare: StoryFn = (args: PropertyProps) => (
  <FlexCol gap={1} alignItems="stretch">
    <FlexRow gap={1}>
      <TextField size="small" value="Sample text Field" />
      <Property {...(args as PropertyPaperProps)} paper={true} size="small"></Property>
    </FlexRow>
    <FlexRow gap={1}>
      <Property {...(args as PropertyPaperProps)} paper={true} size="small"></Property>
      <Property {...(args as PropertyPaperProps)} paper={true} size="small"></Property>
    </FlexRow>
    <FlexRow gap={1}>
      <TextField size="medium" value="Sample text Field" />
      <Property {...(args as PropertyPaperProps)} paper={true} size="medium"></Property>
    </FlexRow>
    <FlexRow gap={1}>
      <Property {...(args as PropertyPaperProps)} paper={true} size="medium"></Property>
      <Property {...(args as PropertyPaperProps)} paper={true} size="medium"></Property>
    </FlexRow>
    <FlexRow gap={1}>
      <TextField value="Sample text Field" />
      <Property {...(args as PropertyPaperProps)} paper={true} size="large"></Property>
    </FlexRow>
    <FlexRow gap={1}>
      <Property {...(args as PropertyPaperProps)} paper={true} size="large"></Property>
      <Property {...(args as PropertyPaperProps)} paper={true} size="large"></Property>
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
  value: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
}

const WithDataSmall = Template.bind({})
WithDataSmall.args = {
  size: 'small',
  title: 'Block Hash',
  value: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
}

const WithDataCompare = TemplateWithCompare.bind({})
WithDataCompare.args = {
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
}

const WithDataCompareOutlined = TemplateWithCompare.bind({})
WithDataCompareOutlined.args = {
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  variant: 'outlined',
}

const WithDataCompareElevation = TemplateWithCompare.bind({})
WithDataCompareElevation.args = {
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  variant: 'elevation',
}

const WithDataAndBadgeSmall = Template.bind({})
WithDataAndBadgeSmall.args = {
  badge: true,
  size: 'small',
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
}

const WithDataAndBadgeMedium = Template.bind({})
WithDataAndBadgeMedium.args = {
  badge: true,
  size: 'medium',
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
}

const WithDataAndBadgeLarge = Template.bind({})
WithDataAndBadgeLarge.args = {
  badge: true,
  size: 'large',
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
}

const WithTip = Template.bind({})
WithTip.args = {
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
}

const WithTipAndBadge = Template.bind({})
WithTipAndBadge.args = {
  badge: true,
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
}

const WithActions = Template.bind({})
WithActions.args = {
  actions: [{ name: 'ActionOne' }, { name: 'ActionTwo' }],
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
}

const LargeWithValue = Template.bind({})
LargeWithValue.args = {
  badge: true,
  size: 'large',
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
}

const LargeWithValueAndActions = Template.bind({})
LargeWithValueAndActions.args = {
  actions: [{ icon: <ReplayIcon />, name: 'ActionOne' }, { name: 'ActionTwo' }],
  badge: true,
  size: 'large',
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
}

const SmallWithValueAndActions = Template.bind({})
SmallWithValueAndActions.args = {
  actions: [{ icon: <ReplayIcon />, name: 'ActionOne' }, { name: 'ActionTwo' }],
  badge: true,
  size: 'small',
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
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
  WithDataCompareElevation,
  WithDataCompareOutlined,
  WithDataSmall,
  WithTip,
  WithTipAndBadge,
  WithUndefinedData,
}

export default StorybookEntry
