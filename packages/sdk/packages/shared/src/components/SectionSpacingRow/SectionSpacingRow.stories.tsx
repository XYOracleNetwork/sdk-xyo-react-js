import { Divider, Typography } from '@mui/material'
import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { SectionSpacingRow } from './SectionSpacingRow.tsx'
const StorybookEntry = {
  argTypes: {},
  component: SectionSpacingRow,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'shared/SectionSpacingRow',
} as Meta<typeof SectionSpacingRow>

const Template: StoryFn<typeof SectionSpacingRow> = args => (
  <BrowserRouter>
    <Typography variant="subtitle2">No Spacing</Typography>
    <Typography textAlign="center">Hello World</Typography>
    <Divider />
    <Typography variant="subtitle2">With Spacing</Typography>
    <SectionSpacingRow {...args}>Hello World</SectionSpacingRow>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

export { Default }

export default StorybookEntry
