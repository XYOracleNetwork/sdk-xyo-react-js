import { ComponentMeta, ComponentStory } from '@storybook/react'

import { samplePayload } from '../../../.storybook'
import { PayloadTable } from './Table'

const StorybookEntry = {
  argTypes: {},
  component: PayloadTable,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Payload/Table',
} as ComponentMeta<typeof PayloadTable>

const Template: ComponentStory<typeof PayloadTable> = (args) => <PayloadTable {...args}></PayloadTable>

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payloads: [samplePayload] }

export { Default, WithData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
