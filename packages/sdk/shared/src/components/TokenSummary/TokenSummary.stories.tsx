import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { TokenSummary } from './TokenSummary'
const StorybookEntry = {
  argTypes: {},
  component: TokenSummary,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'shared/TokenSummary',
} as ComponentMeta<typeof TokenSummary>

const Template: ComponentStory<typeof TokenSummary> = (args) => (
  <BrowserRouter>
    <TokenSummary {...args}></TokenSummary>
  </BrowserRouter>
)

const WithData = Template.bind({})
WithData.args = { icon: 'string', symbol: 'string' }

export { WithData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
