/* eslint-disable import/no-internal-modules */
import { TableBody, TableCell, TableHead, TablePagination, TableRow, useTheme } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { TableEx } from './TableEx'
import { TableFooterEx } from './TableFooterEx'

const StorybookEntry = {
  argTypes: {},
  component: TableEx,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Table/TableEx',
} as ComponentMeta<typeof TableEx>

const Template: ComponentStory<typeof TableEx> = (args) => {
  const { variant } = args
  const theme = useTheme()
  const tableRows = [...Array(100).keys()]

  return (
    <TableEx {...args}>
      <TableHead>
        <TableRow>
          <TableCell>Heading 1</TableCell>
          <TableCell>Heading 2</TableCell>
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

const WithScrollable = Template.bind({})
WithScrollable.args = { variant: 'scrollable', wrapperHeight: 'calc(100vh - 2rem)' }

export { Default, WithScrollable }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
