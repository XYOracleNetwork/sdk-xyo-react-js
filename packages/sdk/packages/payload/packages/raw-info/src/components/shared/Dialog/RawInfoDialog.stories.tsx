import type { Meta, StoryFn } from '@storybook/react-vite'
import { FlexCol } from '@xylabs/react-flexbox'
import { toSafeJson } from '@xylabs/sdk-js'
import {
  asSchema, type Payload, type Schema,
} from '@xyo-network/payload-model'
import React from 'react'

import { RawInfoDialog } from './RawInfoDialog.tsx'

type TestPayload = Payload<{ id: string; schema: string; type: string }, Schema<'network.xyo.test'>>
const TestPayload: TestPayload = {
  id: '123',
  schema: asSchema('network.xyo.test', true),
  type: 'test',
}

export default {
  component: RawInfoDialog,
  title: 'payload/RawInfoDialog',
} as Meta

const Template: StoryFn<typeof RawInfoDialog> = args => (
  <FlexCol>
    <RawInfoDialog {...args} />
  </FlexCol>
)

const Default = Template.bind({})
const WithPayload = Template.bind({})
WithPayload.args = {
  dialogContent: 'This is a test',
  jsonValue: toSafeJson(TestPayload),
  open: true,
}

export { Default, WithPayload }
