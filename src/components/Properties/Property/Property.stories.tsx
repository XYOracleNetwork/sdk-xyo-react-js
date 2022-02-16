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

const WithData = Template.bind({})
WithData.args = { title: 'Block Hash', value: sampleBlockWithPreviousHash._hash }
WithData.decorators = [appThemeDecorator]

const WithTip = Template.bind({})
WithTip.args = { tip: 'This is the block hash', title: 'Block Hash', value: sampleBlockWithPreviousHash._hash }
WithTip.decorators = [appThemeDecorator]

const WithHero = Template.bind({})
WithHero.args = {
  isHero: true,
  tip: 'This is the block hash',
  title: 'Block Hash',
  value: sampleBlockWithPreviousHash._hash,
}
WithHero.decorators = [appThemeDecorator]

export { Default, WithData, WithHero, WithTip }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
