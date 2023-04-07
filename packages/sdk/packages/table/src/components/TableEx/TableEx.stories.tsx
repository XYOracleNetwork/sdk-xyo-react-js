/* eslint-disable import/no-internal-modules */
import { TableBody, TableCell, TableHead, TablePagination, TableRow, useTheme } from '@mui/material'
import { DecoratorFn, Meta, StoryFn } from '@storybook/react'
import { WithRefDecorator } from '@xyo-network/react-storybook'

import { TableCellEx } from './TableCellEx'
import { TableEx } from './TableEx'
import { TableFooterEx } from './TableFooterEx'

const ScrollableDecoratorFn: DecoratorFn = (Story, args) => (
  <div style={{ height: 'calc(100vh - 2rem)', inset: 0, position: 'absolute' }}>
    <Story {...args} />
  </div>
)

const StorybookEntry = {
  argTypes: {},
  component: TableEx,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'shared/TableEx',
} as Meta<typeof TableEx>

const Template: StoryFn<typeof TableEx> = (args) => {
  const { variant } = args
  const theme = useTheme()
  const tableRows = [...Array(100).keys()]

  return (
    <TableEx {...args}>
      <TableHead>
        <TableRow>
          <TableCellEx>Heading 1</TableCellEx>
          <TableCellEx>Heading 2</TableCellEx>
        </TableRow>
      </TableHead>
      <TableBody>
        {tableRows.map((row) => (
          <TableRow key={row}>
            <TableCell>Row {row}</TableCell>
            <TableCell>Cell 2</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooterEx variant={variant}>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
            count={25}
            page={1}
            rowsPerPage={5}
            style={{ borderTop: '1px solid', borderTopColor: theme.palette.divider }}
            SelectProps={{
              inputProps: {
                'aria-label': 'rows per page',
              },
              native: true,
            }}
            onPageChange={() => {
              return
            }}
            onRowsPerPageChange={() => {
              return
            }}
          />
        </TableRow>
      </TableFooterEx>
    </TableEx>
  )
}

const Default = Template.bind({})
Default.args = {}

const WithRef = Template.bind({})
WithRef.decorators = [WithRefDecorator]

const WithScrollable = Template.bind({})
WithScrollable.args = { variant: 'scrollable' }
WithScrollable.decorators = [ScrollableDecoratorFn]

export { Default, WithRef, WithScrollable }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
