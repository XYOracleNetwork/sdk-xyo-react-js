import { ComponentMeta, ComponentStory } from '@storybook/react'

import { appThemeDecorator, sampleBlockWithPreviousHash } from '../../.storybook'
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

const Default = Template.bind({})
Default.args = {}
Default.decorators = [appThemeDecorator]

const WithUndefinedData = Template.bind({})
WithUndefinedData.args = { title: 'Block Hash' }
WithUndefinedData.decorators = [appThemeDecorator]

const WithData = Template.bind({})
WithData.args = { title: 'Block Hash', value: sampleBlockWithPreviousHash._hash }
WithData.decorators = [appThemeDecorator]

const WithTip = Template.bind({})
WithTip.args = {
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: sampleBlockWithPreviousHash._hash,
}
WithTip.decorators = [appThemeDecorator]

const WithActions = Template.bind({})
WithActions.args = {
  actions: [{ name: 'ActionOne' }, { name: 'ActionTwo' }],
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: sampleBlockWithPreviousHash._hash,
}
WithActions.decorators = [appThemeDecorator]

const WithHero = Template.bind({})
WithHero.args = {
  hero: true,
  showBadge: true,
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: sampleBlockWithPreviousHash._hash,
}
WithHero.decorators = [appThemeDecorator]

const WithHeroAndActions = Template.bind({})
WithHeroAndActions.args = {
  actions: [{ name: 'ActionOne' }, { name: 'ActionTwo' }],
  hero: true,
  showBadge: true,
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: sampleBlockWithPreviousHash._hash,
}
WithHeroAndActions.decorators = [appThemeDecorator]

export { Default, WithActions, WithData, WithHero, WithHeroAndActions, WithTip, WithUndefinedData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
