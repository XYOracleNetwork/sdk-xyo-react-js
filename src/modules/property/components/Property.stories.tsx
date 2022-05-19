import { Box, Stack, TextField } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { appThemeDecorator, sampleBlockWithPayloads } from '../../.storybook'
import { Property } from './Property'

const StorybookEntry = {
  argTypes: {},
  component: Property,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Properties/Property',
} as ComponentMeta<typeof Property>

const Template: ComponentStory<typeof Property> = (args) => <Property {...args}></Property>

const TemplateSmall: ComponentStory<typeof Property> = (args) => <Property size="small" {...args}></Property>

const TemplateWithCompare: ComponentStory<typeof Property> = (args) => (
  <Box>
    <Stack spacing={1}>
      <Stack direction="row" spacing={1} maxWidth="90vw">
        <TextField value="Sample text Field" />
        <Property {...args}></Property>
      </Stack>
      <Stack direction="row" spacing={1} maxWidth="90vw">
        <Property {...args}></Property>
        <Property {...args}></Property>
      </Stack>
      <Stack direction="row" spacing={1} maxWidth="90vw">
        <TextField size="small" value="Sample text Field" />
        <Property size="small" {...args}></Property>
      </Stack>
      <Stack direction="row" spacing={1} maxWidth="90vw">
        <Property size="small" {...args}></Property>
        <Property size="small" {...args}></Property>
      </Stack>
    </Stack>
  </Box>
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

const WithDataSmall = TemplateSmall.bind({})
WithDataSmall.args = { title: 'Block Hash', value: sampleBlockWithPayloads._hash }
WithDataSmall.decorators = [appThemeDecorator]

const WithDataAndCompare = TemplateWithCompare.bind({})
WithDataAndCompare.args = { title: 'Block Hash', value: sampleBlockWithPayloads._hash }
WithDataAndCompare.decorators = [appThemeDecorator]

const WithDataAndBadge = Template.bind({})
WithDataAndBadge.args = { badge: true, title: 'Block Hash', value: sampleBlockWithPayloads._hash }
WithDataAndBadge.decorators = [appThemeDecorator]

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

const WithHero = Template.bind({})
WithHero.args = {
  badge: true,
  hero: true,
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: sampleBlockWithPayloads._hash,
}
WithHero.decorators = [appThemeDecorator]

const WithHeroAndActions = Template.bind({})
WithHeroAndActions.args = {
  actions: [{ name: 'ActionOne' }, { name: 'ActionTwo' }],
  badge: true,
  hero: true,
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: sampleBlockWithPayloads._hash,
}
WithHeroAndActions.decorators = [appThemeDecorator]

export { Default, WithActions, WithData, WithDataAndBadge, WithDataAndCompare, WithDataSmall, WithHero, WithHeroAndActions, WithTip, WithTipAndBadge, WithUndefinedData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
