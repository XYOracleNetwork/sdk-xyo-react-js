import { ComponentStory, Meta } from '@storybook/react'
import { useXyoEvent } from '@xyo-network/react-event'
import { useAppThemeDecorator } from '@xyo-network/react-storybook'

import { SchemaProperty } from './SchemaProperty'

const StorybookEntry: Meta = {
  component: SchemaProperty,
  decorators: [useAppThemeDecorator],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Schema/SchemaProperty',
}

const Template: ComponentStory<typeof SchemaProperty> = (args) => {
  const [ref] = useXyoEvent<HTMLDivElement>((noun, verb, data) => {
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
