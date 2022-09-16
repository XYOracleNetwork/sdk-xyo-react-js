import { ComponentMeta, ComponentStory } from '@storybook/react'
import { sampleBlockWithPayloads, useAppThemeDecorator } from '@xyo-network/react-storybook'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { BlockDetails } from './Details'

const StorybookEntry = {
  argTypes: {},
  component: BlockDetails,
  decorators: [useAppThemeDecorator],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'block/Details',
} as ComponentMeta<typeof BlockDetails>

const Template: ComponentStory<typeof BlockDetails> = (args) => (
  <BrowserRouter>
    <Routes>
      <Route path="temp" element={<h1>Successfully navigated to archivePath</h1>} />
      <Route path="*" element={<BlockDetails {...args} />} />
    </Routes>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { block: sampleBlockWithPayloads }

const WithArchiveLink = Template.bind({})
WithArchiveLink.args = { block: sampleBlockWithPayloads }

const WithArchiveLinkPaper = Template.bind({})
WithArchiveLinkPaper.args = { block: sampleBlockWithPayloads, paper: true }

export { Default, WithArchiveLink, WithArchiveLinkPaper, WithData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
