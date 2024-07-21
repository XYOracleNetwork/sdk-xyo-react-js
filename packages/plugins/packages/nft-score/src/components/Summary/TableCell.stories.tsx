import { Meta, StoryFn } from '@storybook/react'
import { sampleUniswapPayload } from '@xyo-network/react-storybook'

import { TableCellSummary } from './TableCellSummary.js'

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

const Template: StoryFn<typeof TableCellSummary> = (args) => <TableCellSummary {...args}></TableCellSummary>

const WithData = Template.bind({})
WithData.args = { payload: sampleUniswapPayload }

export { WithData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
