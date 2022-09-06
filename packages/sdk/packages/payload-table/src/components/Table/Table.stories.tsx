import { ComponentMeta, ComponentStory } from '@storybook/react'
import { sampleIdPayload, sampleSystemInfoBrowserPayload, useAppThemeDecorator } from '@xyo-network/react-storybook'
import { BrowserRouter } from 'react-router-dom'

import { PayloadTable } from './Table'

const StorybookEntry = {
  argTypes: {},
  component: PayloadTable,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'payload/Table',
} as ComponentMeta<typeof PayloadTable>

const Template: ComponentStory<typeof PayloadTable> = (args) => (
  <BrowserRouter>
    <PayloadTable {...args}></PayloadTable>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {}
Default.decorators = [useAppThemeDecorator]

const WithData = Template.bind({})
WithData.args = {
  payloads: [
    sampleIdPayload,
    sampleSystemInfoBrowserPayload,
    sampleIdPayload,
    sampleSystemInfoBrowserPayload,
    sampleIdPayload,
    sampleSystemInfoBrowserPayload,
    sampleIdPayload,
    sampleSystemInfoBrowserPayload,
    sampleIdPayload,
    sampleSystemInfoBrowserPayload,
    sampleIdPayload,
    sampleSystemInfoBrowserPayload,
    sampleIdPayload,
    sampleSystemInfoBrowserPayload,
  ],
}
WithData.decorators = [useAppThemeDecorator]

const WithError = Template.bind({})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { ...badPayload } = sampleIdPayload

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
WithError.args = { payloads: [sampleIdPayload, badPayload] }

export { Default, WithData, WithError }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
