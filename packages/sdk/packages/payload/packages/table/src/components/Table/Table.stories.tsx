import { Chip } from '@mui/material'
import { Meta, StoryFn } from '@storybook/react'
import { Payload } from '@xyo-network/payload-model'
import { useXyoEvent } from '@xyo-network/react-event'
import { sampleIdPayload, sampleSystemInfoBrowserPayload, useAppThemeDecorator } from '@xyo-network/react-storybook'
import { useState } from 'react'
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
} as Meta<typeof PayloadTable>

const Template: StoryFn<typeof PayloadTable> = (args) => {
  const [eventData, setEventData] = useState<string | undefined>()
  const [ref] = useXyoEvent<HTMLTableElement>((_noun, _verb, data) => setEventData(data))

  return (
    <BrowserRouter>
      {eventData ? <Chip label={`EventData: ${eventData}`} onDelete={() => setEventData(undefined)} /> : null}
      <PayloadTable ref={ref} {...args}></PayloadTable>
    </BrowserRouter>
  )
}

const Default = Template.bind({})
Default.args = {}
Default.decorators = [useAppThemeDecorator]

const payloads: Payload[] = [
  sampleIdPayload,
  sampleSystemInfoBrowserPayload,
  sampleIdPayload,
  { schema: 'network.xyo.debug.super.long.schema.for.some.reason' },
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
]

const WithData = Template.bind({})
WithData.args = {
  payloads,
}
WithData.decorators = [useAppThemeDecorator]

const WithOutStickyHeaderFooter = Template.bind({})
WithOutStickyHeaderFooter.args = {
  payloads,
  variant: 'normal',
}

const WithDataAndMaxSchemaDepth = Template.bind({})
WithDataAndMaxSchemaDepth.args = {
  maxSchemaDepth: 2,
  payloads,
}
WithDataAndMaxSchemaDepth.decorators = [useAppThemeDecorator]

const WithInvalid = Template.bind({})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { schema, ...badPayload } = sampleIdPayload

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
WithInvalid.args = { payloads: [sampleIdPayload, badPayload] }

const WithNoResults = Template.bind({})
WithNoResults.args = { payloads: [] }

const WithLoading = Template.bind({})
WithLoading.args = { loading: true, payloads: [] }

export { Default, WithData, WithDataAndMaxSchemaDepth, WithInvalid, WithLoading, WithNoResults, WithOutStickyHeaderFooter }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
