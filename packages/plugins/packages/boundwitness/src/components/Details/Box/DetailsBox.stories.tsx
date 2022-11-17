import { ComponentMeta, ComponentStory } from '@storybook/react'
import { XyoPayload } from '@xyo-network/payload'
import { useXyoEvent } from '@xyo-network/react-event'
import { sampleBlockWithPayloads } from '@xyo-network/react-storybook'
import { createRef } from 'react'

import { BoundWitnessDetailsBox } from './DetailsBox'

const StorybookEntry = {
  argTypes: {},
  component: BoundWitnessDetailsBox,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/boundwitness/DetailsBox',
} as ComponentMeta<typeof BoundWitnessDetailsBox>

const Template: ComponentStory<typeof BoundWitnessDetailsBox> = (args) => {
  const sharedRef = createRef<HTMLDivElement>()
  useXyoEvent<HTMLDivElement>((noun, verb, data) => console.log(`[${noun}|${verb}|${data}]`), sharedRef)
  useXyoEvent<HTMLDivElement>(() => console.log('2nd Listener'), sharedRef)
  useXyoEvent<HTMLDivElement>(() => console.log('3rd Listener'), sharedRef)

  return <BoundWitnessDetailsBox ref={sharedRef} {...args} />
}

const Default = Template.bind({})
Default.args = {}

const WithNoData = Template.bind({})
WithNoData.args = {
  payload: {
    _signatures: [],
    addresses: [],
    payload_hashes: [],
    payload_schemas: [],
    previous_hashes: [],
    schema: 'network.xyo.boundwitness',
  } as XyoPayload,
}

const WithData = Template.bind({})
WithData.args = { payload: sampleBlockWithPayloads }

export { Default, WithData, WithNoData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
