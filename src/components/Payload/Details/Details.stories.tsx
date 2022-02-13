import { ComponentMeta, ComponentStory } from '@storybook/react'

import { samplePayload, samplePayloadFromBuilder } from '../../.storybook'
import { PayloadDetails } from './Details'

const StorybookEntry = {
  argTypes: {},
  component: PayloadDetails,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Payload/Details',
} as ComponentMeta<typeof PayloadDetails>

const Template: ComponentStory<typeof PayloadDetails> = (args) => (
  <PayloadDetails flexGrow={1} {...args}></PayloadDetails>
)

const Default = Template.bind({})
Default.args = {}

const WithSample = Template.bind({})
WithSample.args = { payload: samplePayload }

const WithBuilderSample = Template.bind({})
WithBuilderSample.args = { payload: samplePayloadFromBuilder }

export { Default, WithBuilderSample, WithSample }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
