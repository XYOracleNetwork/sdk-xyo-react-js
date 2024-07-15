import { Link } from '@mui/material'
import { Meta, StoryFn } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import * as tokenData from '../TokenData/index.js'
import { TokenSummary } from './TokenSummary.js'
const StorybookEntry = {
  argTypes: {},
  component: TokenSummary,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'shared/TokenSummary',
} as Meta<typeof TokenSummary>

const Template: StoryFn<typeof TokenSummary> = (args) => (
  <BrowserRouter>
    <TokenSummary {...args}></TokenSummary>
  </BrowserRouter>
)

const WithData = Template.bind({})
WithData.args = { icon: tokenData.TokenData[0].icon, symbol: 'string' }

const SymbolElement = Template.bind({})
SymbolElement.args = {
  icon: tokenData.TokenData[0].icon,
  symbol: 'string',
  symbolElement: (
    <Link underline="hover" href="#">
      Linked Title
    </Link>
  ),
}

export { SymbolElement, WithData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
