import { ComponentMeta, ComponentStory } from '@storybook/react'

import { appThemeDecorator, samplePayload, samplePayloadFromBuilder } from '../../.storybook'
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

const Template: ComponentStory<typeof PayloadDetails> = (args) => <PayloadDetails {...args}></PayloadDetails>

const Default = Template.bind({})
Default.args = {}
Default.decorators = [appThemeDecorator]

const WithSample = Template.bind({})
WithSample.args = { payload: samplePayload }
WithSample.decorators = [appThemeDecorator]

const WithBuilderSample = Template.bind({})
WithBuilderSample.args = { payload: samplePayloadFromBuilder }

export { Default, WithBuilderSample, WithSample }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
