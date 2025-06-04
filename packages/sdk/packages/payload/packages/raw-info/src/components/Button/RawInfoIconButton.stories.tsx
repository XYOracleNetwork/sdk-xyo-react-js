import type { Meta, StoryFn } from '@storybook/react-vite'
import { FlexCol } from '@xylabs/react-flexbox'
import type { Payload } from '@xyo-network/payload-model'
import React from 'react'

import { RawInfoIconButton } from './RawInfoIconButton.tsx'

type TestPayload = Payload<{ id: string; schema: string; type: string }, 'network.xyo.test'>
const TestPayload: TestPayload = {
  id: '123',
  schema: 'network.xyo.test',
  type: 'test',
}

export default {
  component: RawInfoIconButton,
  title: 'payload/RawInfoIconButton',
} as Meta

const Template: StoryFn<typeof RawInfoIconButton> = args => (
  <FlexCol>
    <RawInfoIconButton {...args} />
  </FlexCol>
)

const Default = Template.bind({})
const WithPayload = Template.bind({})
WithPayload.args = {
  dialogContent: 'This is a test',
  rawValue: TestPayload,
}

export { Default, WithPayload }
