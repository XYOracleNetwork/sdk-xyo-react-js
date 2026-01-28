import type { Meta, StoryFn } from '@storybook/react-vite'
import { asSchema, type Payload } from '@xyo-network/payload-model'
import { useEvent } from '@xyo-network/react-event'
import { sampleAddressHistory } from '@xyo-network/react-storybook'
import React, { useRef } from 'react'

import { BoundWitnessDetailsBox } from './DetailsBox.tsx'

const StorybookEntry = {
  argTypes: {},
  component: BoundWitnessDetailsBox,
  parameters: { docs: { page: null } },
  title: 'plugin/boundwitness/DetailsBox',
} as Meta<typeof BoundWitnessDetailsBox>

const Template: StoryFn<typeof BoundWitnessDetailsBox> = (args) => {
  const sharedRef = useRef<HTMLDivElement>(null)
  useEvent<HTMLDivElement>((noun, verb, data) => console.log(`[${noun}|${verb}|${data}]`), sharedRef)
  useEvent<HTMLDivElement>(() => console.log('2nd Listener'), sharedRef)
  useEvent<HTMLDivElement>(() => console.log('3rd Listener'), sharedRef)

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
    schema: asSchema('network.xyo.boundwitness', true),
  } as Payload,
}

const WithData = Template.bind({})
WithData.args = { payload: sampleAddressHistory[1] }

const WithNestedBWPayloads = Template.bind({})
WithNestedBWPayloads.args = {
  payload: {
    $signatures: ['2a6c7e55d2344ec4f839296fcdc88b11dd27b474e832e1227d956838247d7183c2d47c24b4fe1b07c623e039c78babb08f1f12131747673175475c1abf0f719f'],
    addresses: ['db8af7b3084f5a03589af4915e37cbeb3f19afb0'],
    payload_hashes: [
      '1d31053d99a3392f717c7f775df5fc0f999725fb57d705ddcbc01ee4f7288b6d',
      '29fd0b9b3207a55be2bff6022176c041863c7074eb573e103fe571295d263952',
      'c8ab93c970f4ef0d68ee22efd0119f228c089ae77551eda6e707b24bcec589ec',
    ],
    payload_schemas: ['network.xyo.boundwitness', 'network.xyo.id', 'network.xyo.query.archivist.insert'],
    previous_hashes: ['d67b91381ca8015613361470ff3e5dad3618d0ba471af21a1db89b0024c9322e'],
    query: 'c8ab93c970f4ef0d68ee22efd0119f228c089ae77551eda6e707b24bcec589ec',
    schema: asSchema('network.xyo.boundwitness.query', true),
    timestamp: 1_676_043_487_737,
  } as Payload,
}

export {
  Default, WithData, WithNestedBWPayloads, WithNoData,
}

export default StorybookEntry
