import ReplayIcon from '@mui/icons-material/Replay'
import { TextField } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FlexCol, FlexRow } from '@xylabs/react-flexbox'

import { appThemeDecorator, sampleBlockWithPayloads } from '../../../../.storybook'
import { Property } from './Property'
import { PropertyPaperProps } from './Props'

const StorybookEntry = {
  argTypes: {},
  component: Property,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'property/PropertyPaper',
} as ComponentMeta<typeof Property>

const Template: ComponentStory<typeof Property> = (args) => <Property {...(args as PropertyPaperProps)} paper={true}></Property>

const TemplateWithCompare: ComponentStory<typeof Property> = (args) => (
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
Default.decorators = [appThemeDecorator]

const WithTitle = Template.bind({})
WithTitle.args = { title: 'No Data' }
WithTitle.decorators = [appThemeDecorator]

const WithUndefinedData = Template.bind({})
WithUndefinedData.args = { title: 'Block Hash' }
WithUndefinedData.decorators = [appThemeDecorator]

const WithData = Template.bind({})
WithData.args = { title: 'Block Hash', value: sampleBlockWithPayloads._hash }
WithData.decorators = [appThemeDecorator]

const WithDataSmall = Template.bind({})
WithDataSmall.args = { size: 'small', title: 'Block Hash', value: sampleBlockWithPayloads._hash }
WithDataSmall.decorators = [appThemeDecorator]

const WithDataCompare = TemplateWithCompare.bind({})
WithDataCompare.args = { tip: 'This is the block hash', title: 'Block Hash', value: sampleBlockWithPayloads._hash }
WithDataCompare.decorators = [appThemeDecorator]

const WithDataCompareOutlined = TemplateWithCompare.bind({})
WithDataCompareOutlined.args = { tip: 'This is the block hash', title: 'Block Hash', value: sampleBlockWithPayloads._hash, variant: 'outlined' }
WithDataCompareOutlined.decorators = [appThemeDecorator]

const WithDataCompareElevation = TemplateWithCompare.bind({})
WithDataCompareElevation.args = { tip: 'This is the block hash', title: 'Block Hash', value: sampleBlockWithPayloads._hash, variant: 'elevation' }
WithDataCompareElevation.decorators = [appThemeDecorator]

const WithDataAndBadgeSmall = Template.bind({})
WithDataAndBadgeSmall.args = { badge: true, size: 'small', tip: 'This is the block hash', title: 'Block Hash', value: sampleBlockWithPayloads._hash }
WithDataAndBadgeSmall.decorators = [appThemeDecorator]

const WithDataAndBadgeMedium = Template.bind({})
WithDataAndBadgeMedium.args = { badge: true, size: 'medium', tip: 'This is the block hash', title: 'Block Hash', value: sampleBlockWithPayloads._hash }
WithDataAndBadgeMedium.decorators = [appThemeDecorator]

const WithDataAndBadgeLarge = Template.bind({})
WithDataAndBadgeLarge.args = { badge: true, size: 'large', tip: 'This is the block hash', title: 'Block Hash', value: sampleBlockWithPayloads._hash }
WithDataAndBadgeLarge.decorators = [appThemeDecorator]

const WithTip = Template.bind({})
WithTip.args = {
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: sampleBlockWithPayloads._hash,
}
WithTip.decorators = [appThemeDecorator]

const WithTipAndBadge = Template.bind({})
WithTipAndBadge.args = {
  badge: true,
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: sampleBlockWithPayloads._hash,
}
WithTipAndBadge.decorators = [appThemeDecorator]

const WithActions = Template.bind({})
WithActions.args = {
  actions: [{ name: 'ActionOne' }, { name: 'ActionTwo' }],
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: sampleBlockWithPayloads._hash,
}
WithActions.decorators = [appThemeDecorator]

const LargeWithValue = Template.bind({})
LargeWithValue.args = {
  badge: true,
  size: 'large',
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: sampleBlockWithPayloads._hash,
}
LargeWithValue.decorators = [appThemeDecorator]

const LargeWithValueAndActions = Template.bind({})
LargeWithValueAndActions.args = {
  actions: [{ icon: <ReplayIcon />, name: 'ActionOne' }, { name: 'ActionTwo' }],
  badge: true,
  size: 'large',
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: sampleBlockWithPayloads._hash,
}
LargeWithValueAndActions.decorators = [appThemeDecorator]

const SmallWithValueAndActions = Template.bind({})
SmallWithValueAndActions.args = {
  actions: [{ icon: <ReplayIcon />, name: 'ActionOne' }, { name: 'ActionTwo' }],
  badge: true,
  size: 'small',
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: sampleBlockWithPayloads._hash,
}
SmallWithValueAndActions.decorators = [appThemeDecorator]

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

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
