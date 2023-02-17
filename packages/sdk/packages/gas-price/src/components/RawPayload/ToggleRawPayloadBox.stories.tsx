import { ComponentStory, Meta } from '@storybook/react'

import { ToggleRawPayloadBox } from './ToggleRawPayloadBox'

// eslint-disable-next-line import/no-default-export
export default {
  component: ToggleRawPayloadBox,
  title: 'plugin/blockchain/GasPrice/ToggleRawPayloadBox',
} as Meta

const Template: ComponentStory<typeof ToggleRawPayloadBox> = (props) => <ToggleRawPayloadBox {...props} />

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
