import type { Meta, StoryFn } from '@storybook/react-vite'
import {
  type EventNoun, type ExtendEventNoun,
  useEvent,
} from '@xyo-network/react-event'
import React from 'react'

import { BoundWitnessPayloadTableBody } from './TableBody.tsx'

const data = {
  payloadHashes: [
    '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    'abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
  ],
  payloadSchemas: [
    'network.xyo.test',
    'network.xyo.test',
  ],
}

type CustomNoun = ExtendEventNoun<'customNoun'>

export default {
  title: 'plugin/boundwitness/Payloads/Table/Body',
  component: BoundWitnessPayloadTableBody,
} as Meta

const Template: StoryFn<typeof BoundWitnessPayloadTableBody<EventNoun>> = args => <BoundWitnessPayloadTableBody {...args} />
const TemplateWithCustomNouns: StoryFn<typeof BoundWitnessPayloadTableBody<CustomNoun>>
  = (args) => {
    const [ref] = useEvent<HTMLTableSectionElement>((noun, verb, data) => {
      alert(`${noun}|${verb}|${data}`)
    })
    return <BoundWitnessPayloadTableBody<CustomNoun> ref={ref} {...args} />
  }

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = {
  ...data, eventNoun: 'boundwitness', clickableFields: ['hash'],
}

const WithCustomNouns = TemplateWithCustomNouns.bind({})
WithCustomNouns.args = {
  ...data, eventNoun: 'customNoun', clickableFields: ['hash'],
}

export {
  Default, WithCustomNouns, WithData,
}
