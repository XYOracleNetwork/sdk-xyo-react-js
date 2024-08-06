import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { payloadData } from '../storyPayloadData.ts'
import { TableCellSummary } from './TableCellSummary.tsx'

const StorybookEntry = {
  argTypes: {},
  component: TableCellSummary,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/uniswap/TableCellSummary',
} as Meta<typeof TableCellSummary>

const Template: StoryFn<typeof TableCellSummary> = args => <TableCellSummary {...args}></TableCellSummary>

const WithData = Template.bind({})
WithData.args = { payload: payloadData }

export { WithData }

export default StorybookEntry
