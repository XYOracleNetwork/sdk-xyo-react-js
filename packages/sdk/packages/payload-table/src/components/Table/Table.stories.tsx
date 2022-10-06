import { Button, Typography } from '@mui/material'
import { ComponentMeta, ComponentStory, DecoratorFn } from '@storybook/react'
import { delay } from '@xylabs/sdk-js'
import { XyoPayload } from '@xyo-network/payload'
import { sampleIdPayload, sampleSystemInfoBrowserPayload, useAppThemeDecorator } from '@xyo-network/react-storybook'
import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { PayloadTable } from './Table'

const newPayloads = () =>
  Array(25)
    .fill(undefined)
    .map((_, index) => ({ index, random: Math.random(), schema: 'network.xyo.stories.test' }))

// simulating the end of the list
const maxPayloads = 200

const NewPayloadsDecorator: DecoratorFn = (Story, args) => {
  const [payloads, setPayloads] = useState<XyoPayload[]>(newPayloads())
  const [count, setCount] = useState(0)

  const addPayloads = async () => {
    // Simulating delay fetching new payloads
    await delay(800)
    setPayloads((previous) => {
      previous.push(...newPayloads())
      setCount(previous.length)
      return previous
    })
    return true
  }

  const newPayloadList = async () => {
    // Simulating delay fetching new payloads
    await delay(800)
    const newPayloadList = newPayloads()
    setPayloads(newPayloadList)
  }

  args.args = {
    ...args.args,
    count,
    onMorePayloads: payloads.length < maxPayloads ? addPayloads : null,
    payloads,
  }

  return (
    <>
      <Typography>Max Payloads: {maxPayloads}</Typography>
      <Button variant="contained" onClick={newPayloadList}>
        Simulate Network Change
      </Button>
      <Story {...args} />
    </>
  )
}

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

const payloads: XyoPayload[] = [
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

const WithUnknownAmount = Template.bind({})
WithUnknownAmount.decorators = [NewPayloadsDecorator]

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

const WithError = Template.bind({})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { ...badPayload } = sampleIdPayload

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
WithError.args = { payloads: [sampleIdPayload, badPayload] }

export { Default, WithData, WithDataAndMaxSchemaDepth, WithError, WithOutStickyHeaderFooter, WithUnknownAmount }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
