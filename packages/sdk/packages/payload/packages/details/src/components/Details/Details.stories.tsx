import { Meta, StoryFn } from '@storybook/react'
import { sampleIdPayload, samplePayloadFromBuilder } from '@xyo-network/react-storybook'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { PayloadDetails } from './Details.tsx'

const StorybookEntry = {
  argTypes: {},
  component: PayloadDetails,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'payload/Details',
} as Meta<typeof PayloadDetails>

const Template: StoryFn<typeof PayloadDetails> = args => (
  <BrowserRouter>
    <Routes>
      <Route path="temp" element={<h1>Successfully navigated to archivePath</h1>} />
      <Route path="*" element={<PayloadDetails {...args}></PayloadDetails>}></Route>
    </Routes>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {}

const WithSample = Template.bind({})
WithSample.args = { payload: sampleIdPayload }

const WithBuilderSample = Template.bind({})
WithBuilderSample.args = { payload: samplePayloadFromBuilder }

const WithArchiveLink = Template.bind({})
WithArchiveLink.args = { payload: samplePayloadFromBuilder }

const DefaultPaper = Template.bind({})
DefaultPaper.args = { paper: true }

const WithSamplePaper = Template.bind({})
WithSamplePaper.args = { paper: true, payload: sampleIdPayload }

const WithBuilderSamplePaper = Template.bind({})
WithBuilderSamplePaper.args = { paper: true, payload: samplePayloadFromBuilder }

const WithArchiveLinkPaper = Template.bind({})
WithArchiveLinkPaper.args = { paper: true, payload: samplePayloadFromBuilder }

export { Default, DefaultPaper, WithArchiveLink, WithArchiveLinkPaper, WithBuilderSample, WithBuilderSamplePaper, WithSample, WithSamplePaper }

export default StorybookEntry
