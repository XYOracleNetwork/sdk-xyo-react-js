import { Meta, StoryFn } from '@storybook/react'
import { Payload } from '@xyo-network/payload-model'
import { sampleIdPayload } from '@xyo-network/react-storybook'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { PayloadDetails } from '../Details.js'
import { PayloadValidationDetails } from './ValidationDetails.js'
import { PayloadValidationDetailsProps } from './ValidationDetailsProps.js'

const StorybookEntry: Meta = {
  argTypes: {},
  args: {
    value: {
      schema: 'network.xyo.schema',
    },
  },
  component: PayloadDetails,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'payload/ValidationDetails',
}

const Template: StoryFn<typeof PayloadValidationDetails> = (args: PayloadValidationDetailsProps) => (
  <BrowserRouter>
    <PayloadValidationDetails {...args} />
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = { skipBody: true }

const WithErrorsInToolTip = Template.bind({})
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
WithErrorsInToolTip.args = {
  value: {
    ...sampleIdPayload,
    _hash: '6fe3f745b1179fefa74cc3c7eab58321bee1c9ca9e34d9585467364cc5d3bbe2',
    schema: undefined,
  } as unknown as Payload,
}

const SkipBody = Template.bind({})
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
SkipBody.args = {
  skipBody: true,
  value: {
    _hash: '44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a',
    _timestamp: Date.now(),
    schema: 'network.xyo.test',
  } as Payload,
}

export { Default, SkipBody, WithErrorsInToolTip }

export default StorybookEntry
