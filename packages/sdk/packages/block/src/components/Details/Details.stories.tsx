import type { Meta, StoryFn } from '@storybook/react'
import type { Hash } from '@xylabs/hex'
import { useEvent } from '@xyo-network/react-event'
import { DeprecateStory, sampleBlock } from '@xyo-network/react-storybook'
import React, { createRef } from 'react'
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom'

import { BlockLinksDetails } from './BlockLinksDetails.tsx'
import { BlockDetails } from './Details.tsx'

const StorybookEntry = {
  argTypes: {},
  component: BlockDetails,
  parameters: { docs: { page: null } },
  title: 'block/Details',
} as Meta<typeof BlockDetails>

const Template: StoryFn<typeof BlockDetails> = (args) => {
  // eslint-disable-next-line @eslint-react/no-create-ref
  const sharedRef = createRef<HTMLDivElement>()
  useEvent<HTMLDivElement>((noun, verb, data) => console.log(`[${noun}|${verb}|${data}]`), sharedRef)
  useEvent<HTMLDivElement>(() => console.log('2nd Listener'), sharedRef)
  useEvent<HTMLDivElement>(() => console.log('3rd Listener'), sharedRef)

  return (
    <BrowserRouter>
      <DeprecateStory />
      <Routes>
        <Route path="temp" element={<h1>Successfully navigated to archivePath</h1>} />
        <Route path="*" element={<BlockDetails ref={sharedRef} {...args} />} />
      </Routes>
    </BrowserRouter>
  )
}

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { block: sampleBlock }

const WithArchiveLink = Template.bind({})
WithArchiveLink.args = { block: sampleBlock }

const WithPreviousHash = Template.bind({})
const block = { ...sampleBlock, previous_hashes: ['ebeb156c9aa0db6e5bf9fe3bfcab5e7f2765235587667adc34c1e8966f899349'] as Hash[] }
WithPreviousHash.args = {
  block,
  children: (
    <>
      <h2>For Testing events only</h2>
      <BlockLinksDetails value={block} />
    </>
  ),
}

const WithArchiveLinkPaper = Template.bind({})
WithArchiveLinkPaper.args = { block: sampleBlock, paper: true }

export {
  Default, WithArchiveLink, WithArchiveLinkPaper, WithData, WithPreviousHash,
}

export default StorybookEntry
