import { Meta, StoryFn } from '@storybook/react'
import { toJson } from '@xylabs/object'
import { FlexCol } from '@xylabs/react-flexbox'
import { Payload } from '@xyo-network/payload-model'

import { RawInfoDialog } from './RawInfoDialog.js'

type TestPayload = Payload<{ id: string; schema: string; type: string }, 'network.xyo.test'>
const TestPayload: TestPayload = {
  id: '123',
  schema: 'network.xyo.test',
  type: 'test',
}

// eslint-disable-next-line import/no-default-export
export default {
  component: RawInfoDialog,
  title: 'payload/RawInfoDialog',
} as Meta

const Template: StoryFn<typeof RawInfoDialog> = (args) => (
  <FlexCol>
    <RawInfoDialog {...args} />
  </FlexCol>
)

const Default = Template.bind({})
const WithPayload = Template.bind({})
WithPayload.args = {
  dialogContent: 'This is a test',
  jsonValue: toJson(TestPayload),
  open: true,
}

export { Default, WithPayload }
