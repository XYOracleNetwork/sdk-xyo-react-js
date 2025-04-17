import type { Meta, StoryFn } from '@storybook/react'
import type { Hash } from '@xylabs/hex'
import type { Payload } from '@xyo-network/payload-model'
import { useEvent } from '@xyo-network/react-event'
import { sampleBlock } from '@xyo-network/react-storybook'
import React, { useRef } from 'react'
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom'

import { BoundWitnessLinksDetails } from './BoundWitnessLinksDetails.tsx'
import { BoundWitnessDetails } from './Details.tsx'

const StorybookEntry = {
  argTypes: {},
  component: BoundWitnessDetails,
  parameters: { docs: { page: null } },
  title: 'plugin/boundwitness/Details',
} as Meta<typeof BoundWitnessDetails>

const Template: StoryFn<typeof BoundWitnessDetails> = (args) => {
  const sharedRef = useRef<HTMLDivElement>(null)
  useEvent<HTMLDivElement>((noun, verb, data) => console.log(`[${noun}|${verb}|${data}]`), sharedRef)
  useEvent<HTMLDivElement>(() => console.log('2nd Listener'), sharedRef)
  useEvent<HTMLDivElement>(() => console.log('3rd Listener'), sharedRef)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="temp" element={<h1>Successfully navigated to archivePath</h1>} />
        <Route path="*" element={<BoundWitnessDetails ref={sharedRef} {...args} />} />
      </Routes>
    </BrowserRouter>
  )
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
  } as Payload,
}

const WithData = Template.bind({})
WithData.args = { payload: sampleBlock }

const WithArchiveLink = Template.bind({})
WithArchiveLink.args = { payload: sampleBlock }

const WithPreviousHash = Template.bind({})
const payload = { ...sampleBlock, previous_hashes: ['ebeb156c9aa0db6e5bf9fe3bfcab5e7f2765235587667adc34c1e8966f899349'] as Hash[] }
WithPreviousHash.args = {
  children: (
    <>
      <h2>For Testing events only</h2>
      <BoundWitnessLinksDetails value={payload} />
    </>
  ),
  payload,
}

const WithArchiveLinkPaper = Template.bind({})
WithArchiveLinkPaper.args = { paper: true, payload: sampleBlock }

export {
  Default, WithArchiveLink, WithArchiveLinkPaper, WithData, WithNoData, WithPreviousHash,
}

export default StorybookEntry
