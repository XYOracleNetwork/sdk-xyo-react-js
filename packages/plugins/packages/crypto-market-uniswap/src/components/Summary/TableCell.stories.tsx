import { ComponentMeta, ComponentStory } from '@storybook/react'

import { payloadData } from '../storyPayloadData'
import { TableCellSummary } from './TableCellSummary'

const StorybookEntry = {
  argTypes: {},
  component: TableCellSummary,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/uniswap/TableCellSummary',
} as ComponentMeta<typeof TableCellSummary>

const Template: ComponentStory<typeof TableCellSummary> = (args) => <TableCellSummary {...args}></TableCellSummary>

const WithData = Template.bind({})
WithData.args = { payload: payloadData }

export { WithData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
