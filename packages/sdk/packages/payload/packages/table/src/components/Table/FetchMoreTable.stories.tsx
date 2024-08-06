import { Button, Typography } from '@mui/material'
import { Decorator, Meta, StoryFn } from '@storybook/react'
import { delay } from '@xylabs/delay'
import { Payload } from '@xyo-network/payload-model'
import { useEvent } from '@xyo-network/react-event'
import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { PayloadTable } from './Table.js'

const newPayloads = () =>
  Array(50)
    // eslint-disable-next-line unicorn/no-useless-undefined
    .fill(undefined)
    .map((_, index) => ({ index, random: Math.random(), schema: 'network.xyo.stories.test' }))

// simulating the end of the list
const maxPayloads = 200

const NewPayloadsDecorator: Decorator = (Story, args) => {
  const testPayloads = newPayloads()
  const [payloads, setPayloads] = useState<Payload[]>([])
  const [count, setCount] = useState(0)

  const addToTotalPayloads = (payloads: Payload[]) =>
    setPayloads((previous) => {
      previous.push(...payloads)
      setCount(previous.length)
      return previous
    })

  useEffect(() => {
    // simulate initial async payloads
    setTimeout(() => {
      addToTotalPayloads(testPayloads)
    }, 500)
  }, [])

  const addPayloads = () => {
    addToTotalPayloads(newPayloads())
    return true
  }

  const newPayloadList = async () => {
    // Simulating delay fetching new payloads
    await delay(800)
    const newPayloadList = newPayloads()
    setCount(newPayloadList.length)
    setPayloads(newPayloadList)
  }

  args.args = {
    ...args.args,
    count,
    fetchMorePayloads: payloads.length < maxPayloads ? addPayloads : null,
    payloads,
  }

  return (
    <>
      <Typography>
        Max Payloads:
        {maxPayloads}
      </Typography>
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
  title: 'payload/FetchMoreTable',
} as Meta<typeof PayloadTable>

const Template: StoryFn<typeof PayloadTable> = (args) => {
  const [ref] = useEvent<HTMLTableElement>((noun, verb, data) => console.log(`[${noun}|${verb}|${data}]`))
  return (
    <BrowserRouter>
      <PayloadTable ref={ref} {...args}></PayloadTable>
    </BrowserRouter>
  )
}

const Default = Template.bind({})
Default.args = {}
Default.decorators = [NewPayloadsDecorator]

export { Default }

export default StorybookEntry
