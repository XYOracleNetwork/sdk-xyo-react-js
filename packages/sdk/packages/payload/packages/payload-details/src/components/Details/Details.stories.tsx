import { ComponentMeta, ComponentStory } from '@storybook/react'
import { sampleIdPayload, samplePayloadFromBuilder, useAppThemeDecorator } from '@xyo-network/react-storybook'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { PayloadDetails } from './Details'

const StorybookEntry = {
  argTypes: {},
  component: PayloadDetails,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'payload/Details',
} as ComponentMeta<typeof PayloadDetails>

const Template: ComponentStory<typeof PayloadDetails> = (args) => (
  <BrowserRouter>
    <Routes>
      <Route path="temp" element={<h1>Successfully navigated to archivePath</h1>} />
      <Route path="*" element={<PayloadDetails {...args}></PayloadDetails>}></Route>
    </Routes>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {}
Default.decorators = [useAppThemeDecorator]

const WithSample = Template.bind({})
WithSample.args = { payload: sampleIdPayload }
WithSample.decorators = [useAppThemeDecorator]

const WithBuilderSample = Template.bind({})
WithBuilderSample.args = { payload: samplePayloadFromBuilder }
WithBuilderSample.decorators = [useAppThemeDecorator]

const WithArchiveLink = Template.bind({})
WithArchiveLink.args = { payload: samplePayloadFromBuilder }
WithArchiveLink.decorators = [useAppThemeDecorator]

const DefaultPaper = Template.bind({})
DefaultPaper.args = { paper: true }
DefaultPaper.decorators = [useAppThemeDecorator]

const WithSamplePaper = Template.bind({})
WithSamplePaper.args = { paper: true, payload: sampleIdPayload }
WithSamplePaper.decorators = [useAppThemeDecorator]

const WithBuilderSamplePaper = Template.bind({})
WithBuilderSamplePaper.args = { paper: true, payload: samplePayloadFromBuilder }
WithBuilderSamplePaper.decorators = [useAppThemeDecorator]

const WithArchiveLinkPaper = Template.bind({})
WithArchiveLinkPaper.args = { paper: true, payload: samplePayloadFromBuilder }
WithArchiveLinkPaper.decorators = [useAppThemeDecorator]

export { Default, DefaultPaper, WithArchiveLink, WithArchiveLinkPaper, WithBuilderSample, WithBuilderSamplePaper, WithSample, WithSamplePaper }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
