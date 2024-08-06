import { Meta, StoryFn } from '@storybook/react'

import { ToggleRawPayloadBox } from './ToggleRawPayloadBox.js'

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
