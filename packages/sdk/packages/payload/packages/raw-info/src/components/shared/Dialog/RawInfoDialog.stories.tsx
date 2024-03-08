import { Meta, StoryFn } from "@storybook/react";
import { JsonObject } from "@xylabs/object";
import { FlexCol } from "@xylabs/react-flexbox";
import { Payload } from "@xyo-network/payload-model";
import { RawInfoDialog } from "./RawInfoDialog";

type TestPayload = Payload<{ id: string, type: string, schema: string }, 'network.xyo.test'>
const TestPayload: TestPayload = {
  id: '123',
  type: 'test',
  schema: 'network.xyo.test',
}

export default {
  title: 'payload/RawInfoDialog',
  component: RawInfoDialog,
} as Meta

const Template: StoryFn<typeof RawInfoDialog> = (args) => <FlexCol><RawInfoDialog {...args} /></FlexCol>

const Default = Template.bind({})
const WithPayload = Template.bind({})
WithPayload.args = {
  dialogContent: 'This is a test',
  open: true,
  jsonObject: TestPayload as JsonObject
}

export { Default, WithPayload };
