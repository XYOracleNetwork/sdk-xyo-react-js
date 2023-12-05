/* eslint-disable import/no-deprecated */
import { Meta, StoryFn } from '@storybook/react'
import { useEvent } from '@xyo-network/react-event'
import { DeprecateStory, sampleBlockWithPayloads } from '@xyo-network/react-storybook'
import { createRef } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { BlockLinksDetails } from './BlockLinksDetails'
import { BlockDetails } from './Details'

const StorybookEntry = {
  argTypes: {},
  component: BlockDetails,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'block/Details',
} as Meta<typeof BlockDetails>

const Template: StoryFn<typeof BlockDetails> = (args) => {
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
WithData.args = { block: sampleBlockWithPayloads }

const WithArchiveLink = Template.bind({})
WithArchiveLink.args = { block: sampleBlockWithPayloads }

const WithPreviousHash = Template.bind({})
const block = { ...sampleBlockWithPayloads, previous_hashes: ['ebeb156c9aa0db6e5bf9fe3bfcab5e7f2765235587667adc34c1e8966f899349'] }
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
WithArchiveLinkPaper.args = { block: sampleBlockWithPayloads, paper: true }

export { Default, WithArchiveLink, WithArchiveLinkPaper, WithData, WithPreviousHash }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
