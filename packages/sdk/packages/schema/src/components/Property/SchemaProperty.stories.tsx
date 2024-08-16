import type { Meta, StoryFn } from '@storybook/react'
import { useEvent } from '@xyo-network/react-event'
import React from 'react'

import type { SchemaPropertyProps } from './SchemaProperty.tsx'
import { SchemaProperty } from './SchemaProperty.tsx'

const StorybookEntry: Meta = {
  component: SchemaProperty,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Schema/SchemaProperty',
}

const Template: StoryFn = (args: SchemaPropertyProps) => {
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

export default StorybookEntry
