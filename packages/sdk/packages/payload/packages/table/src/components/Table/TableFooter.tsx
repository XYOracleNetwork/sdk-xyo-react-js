import { styled, TablePagination, TableRow } from '@mui/material'
import { TableFooterEx } from '@xyo-network/react-table'

import { TablePaginationActions } from './TablePagination'
import { PayloadTableFooterProps } from './types'

export const PayloadTableFooter: React.FC<PayloadTableFooterProps> = ({
  count,
  variant,
  page,
  rowsPerPage,
  handleChangePage = () => undefined,
  handleChangeRowsPerPage = () => undefined,
  fetchMorePayloads,
  loading,
}) => (
  <TableFooterEx variant={variant}>
    <TableRow>
      <StyledTablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        count={count ?? 0}
        rowsPerPage={rowsPerPage ?? 10}
        page={page ?? 0}
        SelectProps={{
          inputProps: {
            'aria-label': 'rows per page',
          },
          native: true,
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ActionsComponent={(props: any) => <TablePaginationActions enableNextPage={!!fetchMorePayloads} loading={loading} {...props} />}
      />
    </TableRow>
  </TableFooterEx>
)

const StyledTablePagination = styled(TablePagination)(({ theme }) => ({
  '& > .MuiToolbar-root': {
    paddingLeft: theme.spacing(1),
  },
  borderTop: '1px solid',
  borderTopColor: theme.palette.divider,
}))
