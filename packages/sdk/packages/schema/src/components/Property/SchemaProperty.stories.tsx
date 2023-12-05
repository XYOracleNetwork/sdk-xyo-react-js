import { Meta, StoryFn } from '@storybook/react'
import { useEvent } from '@xyo-network/react-event'

import { SchemaProperty, SchemaPropertyProps } from './SchemaProperty'

const StorybookEntry: Meta = {
  component: SchemaProperty,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Schema/SchemaProperty',
}

const Template: StoryFn<typeof SchemaProperty> = (args: SchemaPropertyProps) => {
  const [ref] = useEvent<HTMLDivElement>((noun, verb, data) => {
    console.log(`${noun}|${verb}|${data}`)
  })
  return (
    <div ref={ref}>
      <SchemaProperty {...args} />
    </div>
  )
}

const Default = Template.bind({})
Default.args = {}

const WithVerifiedValue = Template.bind({})
WithVerifiedValue.args = { value: 'network.xyo.schema' }

const WithVerifiedValuePaper = Template.bind({})
WithVerifiedValuePaper.args = { paper: true, value: 'network.xyo.schema' }

const WithUnverifiedValue = Template.bind({})
WithUnverifiedValue.args = { value: 'network.xyo.blahblah' }

export { Default, WithUnverifiedValue, WithVerifiedValue, WithVerifiedValuePaper }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
