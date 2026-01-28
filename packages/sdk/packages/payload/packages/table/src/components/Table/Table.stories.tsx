import { Chip } from '@mui/material'
import type { Meta, StoryFn } from '@storybook/react-vite'
import { isDefined } from '@xylabs/sdk-js'
import { asSchema, type Payload } from '@xyo-network/payload-model'
import { useEvent } from '@xyo-network/react-event'
import { sampleIdPayload, sampleSystemInfoBrowserPayload } from '@xyo-network/react-storybook'
import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { PayloadTable } from './Table.tsx'
import { PayloadTableBody } from './TableBody.tsx'
import { PayloadTableFooter } from './TableFooter.tsx'
import { PayloadTableHead } from './TableHead.tsx'

const payloads: Payload[] = [
  sampleIdPayload,
  sampleSystemInfoBrowserPayload,
  sampleIdPayload,
  { schema: asSchema('network.xyo.debug.super.long.schema.for.some.reason', true) },
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

const StorybookEntry = {
  argTypes: {},
  component: PayloadTable,
  parameters: { docs: { page: null } },
  title: 'payload/Table',
} as Meta<typeof PayloadTable>

const Template: StoryFn<typeof PayloadTable> = (args) => {
  const [eventData, setEventData] = useState<string | undefined>()
  const [ref] = useEvent<HTMLTableElement>((_noun, _verb, data) => {
    setEventData(data)
  })

  return (
    <BrowserRouter>
      {isDefined(eventData)
        ? <Chip label={`EventData: ${eventData}`} onDelete={() => setEventData(undefined)} />
        : null}
      <PayloadTable ref={ref} {...args}></PayloadTable>
    </BrowserRouter>
  )
}

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = {
  payloads,
  PayloadTableBodyComponent: PayloadTableBody,
  PayloadTableHeadComponent: PayloadTableHead,
  PayloadTableFooterComponent: PayloadTableFooter,
  clickableFields: ['hash'],
}

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

const WithInvalid = Template.bind({})

const { schema, ...badPayload } = sampleIdPayload

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
WithInvalid.args = { payloads: [sampleIdPayload, badPayload] }

const WithNoResults = Template.bind({})
WithNoResults.args = { payloads: [] }

const WithLoading = Template.bind({})
WithLoading.args = { loading: true, payloads: [] }

export {
  Default, WithData, WithDataAndMaxSchemaDepth, WithInvalid, WithLoading, WithNoResults, WithOutStickyHeaderFooter,
}

export default StorybookEntry
