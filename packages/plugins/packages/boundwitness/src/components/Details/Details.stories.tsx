import { ComponentMeta, ComponentStory } from '@storybook/react'
import { XyoPayload } from '@xyo-network/payload-model'
import { useXyoEvent } from '@xyo-network/react-event'
import { sampleBlockWithPayloads, useAppThemeDecorator } from '@xyo-network/react-storybook'
import { createRef } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { BoundWitnessLinksDetails } from './BoundWitnessLinksDetails'
import { BoundWitnessDetails } from './Details'

const StorybookEntry = {
  argTypes: {},
  component: BoundWitnessDetails,
  decorators: [useAppThemeDecorator],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/boundwitness/Details',
} as ComponentMeta<typeof BoundWitnessDetails>

const Template: ComponentStory<typeof BoundWitnessDetails> = (args) => {
  const sharedRef = createRef<HTMLDivElement>()
  useXyoEvent<HTMLDivElement>((noun, verb, data) => console.log(`[${noun}|${verb}|${data}]`), sharedRef)
  useXyoEvent<HTMLDivElement>(() => console.log('2nd Listener'), sharedRef)
  useXyoEvent<HTMLDivElement>(() => console.log('3rd Listener'), sharedRef)

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
  } as XyoPayload,
}

const WithData = Template.bind({})
WithData.args = { payload: sampleBlockWithPayloads }

const WithArchiveLink = Template.bind({})
WithArchiveLink.args = { payload: sampleBlockWithPayloads }

const WithPreviousHash = Template.bind({})
const payload = { ...sampleBlockWithPayloads, previous_hashes: ['ebeb156c9aa0db6e5bf9fe3bfcab5e7f2765235587667adc34c1e8966f899349'] }
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
WithArchiveLinkPaper.args = { paper: true, payload: sampleBlockWithPayloads }

export { Default, WithArchiveLink, WithArchiveLinkPaper, WithData, WithNoData, WithPreviousHash }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
