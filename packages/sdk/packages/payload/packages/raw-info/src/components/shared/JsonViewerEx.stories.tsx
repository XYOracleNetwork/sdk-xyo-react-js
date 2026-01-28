import type { Meta, StoryFn } from '@storybook/react-vite'
import {
  asSchema, type Payload, type Schema,
} from '@xyo-network/payload-model'
import React from 'react'

import { JsonViewerEx } from './JsonViewerEx.tsx'

type TestPayload = Payload<{ id: string; schema: string; type: string }, Schema<'network.xyo.test'>>
const TestPayload: TestPayload = {
  id: '123',
  schema: asSchema('network.xyo.test', true),
  type: 'test',
}

export default {
  component: JsonViewerEx,
  title: 'payload/JsonViewerEx',
} as Meta

const Template: StoryFn<typeof JsonViewerEx> = args => (
  <JsonViewerEx {...args} />
)

const Default = Template.bind({})
const WithPayload = Template.bind({})
WithPayload.args = { value: TestPayload }

export { Default, WithPayload }
