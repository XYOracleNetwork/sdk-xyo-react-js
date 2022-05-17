import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { appThemeDecorator, samplePayload, samplePayloadFromBuilder } from '../../../.storybook'
import { PayloadDetails } from './Details'

const StorybookEntry = {
  argTypes: {},
  component: PayloadDetails,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Payload/Details',
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
WithArchiveLink.args = { payload: samplePayloadFromBuilder, payloadMetaDetailsProps: { archivePath: 'temp' } }
WithArchiveLink.decorators = [appThemeDecorator]

export { Default, WithArchiveLink, WithBuilderSample, WithSample }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
