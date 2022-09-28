import { useEffect } from '@storybook/addons'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { sampleBlockWithPayloads, useAppThemeDecorator } from '@xyo-network/react-storybook'
import { useRef } from 'react'
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

const Template: ComponentStory<typeof BlockDetails> = (args) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log(`ref.current: ${ref?.current}`)
    ref.current?.addEventListener('xyo', () => console.log('Bah!'))
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path="temp" element={<h1>Successfully navigated to archivePath</h1>} />
        <Route path="*" element={<BlockDetails ref={ref} {...args} />} />
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
WithPreviousHash.args = { block: { ...sampleBlockWithPayloads, previous_hash: 'ebeb156c9aa0db6e5bf9fe3bfcab5e7f2765235587667adc34c1e8966f899349' } }

const WithArchiveLinkPaper = Template.bind({})
WithArchiveLinkPaper.args = { block: sampleBlockWithPayloads, paper: true }

export { Default, WithArchiveLink, WithArchiveLinkPaper, WithData, WithPreviousHash }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
