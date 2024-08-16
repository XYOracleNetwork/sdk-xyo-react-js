import type { Meta, StoryFn } from '@storybook/react'
import { sampleUniswapPayload } from '@xyo-network/react-storybook'
import React from 'react'

import { TableCellSummary } from './TableCellSummary.tsx'

const StorybookEntry = {
  argTypes: {},
  component: TableCellSummary,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/nft-score/TableCellSummary',
} as Meta<typeof TableCellSummary>

const Template: StoryFn<typeof TableCellSummary> = args => <TableCellSummary {...args}></TableCellSummary>

const WithData = Template.bind({})
WithData.args = { payload: sampleUniswapPayload }

export { WithData }

export default StorybookEntry
