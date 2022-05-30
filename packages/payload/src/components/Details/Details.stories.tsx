import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { appThemeDecorator, samplePayload, samplePayloadFromBuilder } from '../../../../../.storybook'
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
Default.decorators = [appThemeDecorator]

const WithSample = Template.bind({})
WithSample.args = { payload: samplePayload }
WithSample.decorators = [appThemeDecorator]

const WithBuilderSample = Template.bind({})
WithBuilderSample.args = { payload: samplePayloadFromBuilder }
WithBuilderSample.decorators = [appThemeDecorator]

const WithArchiveLink = Template.bind({})
WithArchiveLink.args = { archivePath: 'temp', payload: samplePayloadFromBuilder }
WithArchiveLink.decorators = [appThemeDecorator]

const DefaultPaper = Template.bind({})
DefaultPaper.args = { paper: true }
DefaultPaper.decorators = [appThemeDecorator]

const WithSamplePaper = Template.bind({})
WithSamplePaper.args = { paper: true, payload: samplePayload }
WithSamplePaper.decorators = [appThemeDecorator]

const WithBuilderSamplePaper = Template.bind({})
WithBuilderSamplePaper.args = { paper: true, payload: samplePayloadFromBuilder }
WithBuilderSamplePaper.decorators = [appThemeDecorator]

const WithArchiveLinkPaper = Template.bind({})
WithArchiveLinkPaper.args = { archivePath: 'temp', paper: true, payload: samplePayloadFromBuilder }
WithArchiveLinkPaper.decorators = [appThemeDecorator]

export { Default, DefaultPaper, WithArchiveLink, WithArchiveLinkPaper, WithBuilderSample, WithBuilderSamplePaper, WithSample, WithSamplePaper }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
