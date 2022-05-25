import { ComponentStory, Meta } from '@storybook/react'

import { appThemeDecorator } from '../../.storybook'
import { SchemaProperty } from './SchemaProperty'

const StorybookEntry: Meta = {
  argTypes: {},
  args: {},
  component: SchemaProperty,
  decorators: [appThemeDecorator],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Schema/SchemaProperty',
}

const Template: ComponentStory<typeof SchemaProperty> = (args) => <SchemaProperty {...args} />

const Default = Template.bind({})
Default.args = {}

const WithVerfiedValue = Template.bind({})
WithVerfiedValue.args = { value: 'network.xyo.schema' }

const WithUnverfiedValue = Template.bind({})
WithUnverfiedValue.args = { value: 'network.xyo.blahblah' }

export { Default, WithUnverfiedValue, WithVerfiedValue }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
