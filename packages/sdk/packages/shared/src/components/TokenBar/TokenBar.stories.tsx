import { Meta, StoryFn } from '@storybook/react'
import { QuickTipButton } from '@xylabs/react-quick-tip-button'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { TokenBar } from './TokenBar.js'
const StorybookEntry = {
  argTypes: {},
  component: TokenBar,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'shared/TokenBar',
} as Meta<typeof TokenBar>

const Template: StoryFn<typeof TokenBar> = args => (
  <BrowserRouter>
    <TokenBar {...args}></TokenBar>
  </BrowserRouter>
)

const WithData = Template.bind({})
WithData.args = { text1: 'Hello', text2: 'World' }

const WithSuffixes = Template.bind({})
WithSuffixes.args = { text1: 'ETH', text2: '0.062342', text2Suffix: <QuickTipButton title="0.06234298345834958" /> }

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

export { WithData, WithSuffixes }

export default StorybookEntry
