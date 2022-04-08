import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { appThemeDecorator, samplePayload } from '../../.storybook'
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

const Template: ComponentStory<typeof PayloadTable> = (args) => (
  <BrowserRouter>
    <PayloadTable {...args}></PayloadTable>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {}
Default.decorators = [appThemeDecorator]

const WithData = Template.bind({})
WithData.args = { payloads: [samplePayload, samplePayload] }
WithData.decorators = [appThemeDecorator]

export { Default, WithData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
