import { Button, Typography } from '@mui/material'
import { ComponentMeta, ComponentStory, DecoratorFn } from '@storybook/react'
import { delay } from '@xylabs/sdk-js'
import { XyoPayload } from '@xyo-network/payload'
import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { PayloadTable } from './Table'

const newPayloads = () =>
  Array(50)
    .fill(undefined)
    .map((_, index) => ({ index, random: Math.random(), schema: 'network.xyo.stories.test' }))

// simulating the end of the list
const maxPayloads = 200

const NewPayloadsDecorator: DecoratorFn = (Story, args) => {
  const testPayloads = newPayloads()
  const [payloads, setPayloads] = useState<XyoPayload[]>(testPayloads)
  const [count, setCount] = useState(testPayloads.length)

  const addPayloads = () => {
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
  title: 'payload/FetchMoreTable',
} as ComponentMeta<typeof PayloadTable>

const Template: ComponentStory<typeof PayloadTable> = (args) => (
  <BrowserRouter>
    <PayloadTable {...args}></PayloadTable>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {}
Default.decorators = [NewPayloadsDecorator]

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
