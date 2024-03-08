import { Meta, StoryFn } from "@storybook/react";
import { FlexCol } from "@xylabs/react-flexbox";
import { Payload } from "@xyo-network/payload-model";
import { RawInfoIconButton } from "./RawInfoIconButton";

type TestPayload = Payload<{ id: string, type: string, schema: string }, 'network.xyo.test'>
const TestPayload: TestPayload = {
  id: '123',
  type: 'test',
  schema: 'network.xyo.test',
}

export default {
  title: 'payload/RawInfoIcon',
  component: RawInfoIconButton,
} as Meta

const Template: StoryFn<typeof RawInfoIconButton> = (args) => <FlexCol><RawInfoIconButton {...args} /></FlexCol>

const Default = Template.bind({})
const WithPayload = Template.bind({})
WithPayload.args = {
  dialogContent: 'This is a test',
  payload: TestPayload
}

export { Default, WithPayload };

