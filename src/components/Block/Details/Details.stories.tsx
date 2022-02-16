import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { appThemeDecorator, sampleBlockWithPreviousHash } from '../../.storybook'
import { BlockDetails } from './Details'

const StorybookEntry = {
  argTypes: {},
  component: BlockDetails,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Block/Details',
} as ComponentMeta<typeof BlockDetails>

const Template: ComponentStory<typeof BlockDetails> = (args) => (
  <BrowserRouter>
    <BlockDetails {...args}></BlockDetails>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {}
Default.decorators = [appThemeDecorator]

const WithData = Template.bind({})
WithData.args = { block: sampleBlockWithPreviousHash }
WithData.decorators = [appThemeDecorator]

export { Default, WithData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
