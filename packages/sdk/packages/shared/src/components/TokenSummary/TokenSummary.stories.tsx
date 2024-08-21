import { Link } from '@mui/material'
import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import * as tokenData from '../TokenData/index.ts'
import { TokenSummary } from './TokenSummary.tsx'
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

const Template: StoryFn<typeof TokenSummary> = args => (
  <BrowserRouter>
    <TokenSummary {...args}></TokenSummary>
  </BrowserRouter>
)

const WithData = Template.bind({})
WithData.args = {
  icon: tokenData.TokenData[0].icon, symbol: 'string',
}

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

export default StorybookEntry
