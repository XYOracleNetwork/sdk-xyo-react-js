import { ComponentMeta, ComponentStory } from '@storybook/react'

import { samplePayload } from '../../../.storybook'
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

const WithData = Template.bind({})

WithData.args = { payload: samplePayload }

export { Default, WithData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
