import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { appThemeDecorator, sampleBlockWithPayloads } from '../../.storybook'
import { BlockDetails } from './Details'

const StorybookEntry = {
  argTypes: {},
  component: BlockDetails,
  decorators: [appThemeDecorator],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Block/Details',
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
WithArchiveLink.args = { block: sampleBlockWithPayloads, blockMetaDetailsProps: { archivePath: 'temp' } }

export { Default, WithArchiveLink, WithData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
