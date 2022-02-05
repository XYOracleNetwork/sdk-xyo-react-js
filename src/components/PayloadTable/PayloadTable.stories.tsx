import { ComponentMeta, ComponentStory } from '@storybook/react'

import { PayloadTable } from './PayloadTable'

const StorybookEntry = {
  argTypes: {},
  component: PayloadTable,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'PayloadTable/Table',
} as ComponentMeta<typeof PayloadTable>

const Template: ComponentStory<typeof PayloadTable> = (args) => <PayloadTable {...args}></PayloadTable>

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { payloads: [{ schema: 'test.xyo.network' }] }

export { Default, WithData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
