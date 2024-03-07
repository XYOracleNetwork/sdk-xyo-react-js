import { Meta, StoryFn } from "@storybook/react";
import { FlexCol } from "@xylabs/react-flexbox";
import { InvertibleCssVarsProvider } from "@xylabs/react-invertible-theme";
import { Payload } from "@xyo-network/payload-model";
import { RawInfoIcon } from "./RawInfoIcon";

type TestPayload = Payload<{ id: string, type: string, schema: string }, 'network.xyo.test'>
const TestPayload: TestPayload = {
  id: '123',
  type: 'test',
  schema: 'network.xyo.test',
}

export default {
  title: 'payload/RawInfoIcon',
  component: RawInfoIcon,
  decorators: [(Story: StoryFn) => <InvertibleCssVarsProvider><Story /></InvertibleCssVarsProvider>],
} as Meta

const Template: StoryFn<typeof RawInfoIcon> = (args) => <FlexCol><RawInfoIcon {...args} /></FlexCol>

const Default = Template.bind({})
const WithPayload = Template.bind({})
WithPayload.args = {
  dialogContent: 'This is a test',
  payload: TestPayload
}

export { Default, WithPayload };
