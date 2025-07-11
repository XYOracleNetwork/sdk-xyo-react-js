import type { Meta, StoryFn } from '@storybook/react-vite'
import React from 'react'

import { ToggleRawPayloadBox } from './ToggleRawPayloadBox.tsx'

export default {
  component: ToggleRawPayloadBox,
  title: 'plugin/blockchain/GasPrice/ToggleRawPayloadBox',
} as Meta

const Template: StoryFn<typeof ToggleRawPayloadBox> = props => <ToggleRawPayloadBox {...props} />

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = {
  gasPricePayload: {
    foo: 'bar',
    schema: 'network.xyo.some.schema',
  },
}

export { Default, WithData }
