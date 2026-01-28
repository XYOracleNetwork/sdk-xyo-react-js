import type { Meta, StoryFn } from '@storybook/react-vite'
import { FlexCol } from '@xylabs/react-flexbox'
import {
  asSchema, type Payload, type Schema,
} from '@xyo-network/payload-model'
import React from 'react'

import { RawInfoButton } from './RawInfoButton.tsx'

type TestPayload = Payload<{ id: string; type: string }, Schema<'network.xyo.test'>>
const TestPayload: TestPayload = {
  id: '123',
  schema: asSchema('network.xyo.test', true),
  type: 'test',
}

export default {
  component: RawInfoButton,
  title: 'payload/RawInfoButton',
} as Meta

const Template: StoryFn<typeof RawInfoButton> = args => (
  <FlexCol>
    <RawInfoButton {...args} />
  </FlexCol>
)

const Default = Template.bind({})
const WithPayload = Template.bind({})
WithPayload.args = {
  dialogContent: 'This is a test',
  rawValue: TestPayload,
}

export { Default, WithPayload }
