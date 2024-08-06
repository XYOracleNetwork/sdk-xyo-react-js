import { Meta, StoryFn } from '@storybook/react'
import { FlexCol } from '@xylabs/react-flexbox'
import { Payload } from '@xyo-network/payload-model'

import { RawInfoButton } from './RawInfoButton.js'

type TestPayload = Payload<{ id: string; schema: string; type: string }, 'network.xyo.test'>
const TestPayload: TestPayload = {
  id: '123',
  schema: 'network.xyo.test',
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
