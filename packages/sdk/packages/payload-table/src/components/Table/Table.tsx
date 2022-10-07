import { Alert, styled, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import { useBreakpoint } from '@xylabs/react-shared'
import { PayloadWrapper, XyoPayload } from '@xyo-network/payload'
import { XyoApiThrownErrorBoundary } from '@xyo-network/react-auth-service'
import { TableEx, TableExProps, TableFooterEx } from '@xyo-network/react-table'
import { useEffect, useMemo, useState } from 'react'

import { payloadColumnNames, PayloadTableColumnConfig, payloadTableColumnConfigDefaults } from './PayloadTableColumnConfig'
import { TablePaginationActions } from './TablePagination'
import { PayloadTableRow } from './TableRow'

export interface PayloadTableProps extends TableExProps {
  exploreDomain?: string
  archive?: string
  onRowClick?: (value: XyoPayload) => void
  fetchMorePayloads?: () => boolean
  rowsPerPage?: number
  payloads?: XyoPayload[] | null
  columns?: PayloadTableColumnConfig
  maxSchemaDepth?: number
  count?: number | null
  loading?: boolean
}

export const PayloadTable: React.FC<PayloadTableProps> = ({
  exploreDomain,
  archive,
  onRowClick,
  fetchMorePayloads,
  rowsPerPage: rowsPerPageProp = 25,
  payloads,
  children,
  columns = payloadTableColumnConfigDefaults(),
  maxSchemaDepth,
  count,
  loading = false,
  variant = 'scrollable',
  ...props
}) => {
  const breakPoint = useBreakpoint()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageProp)
  const [payloadCount, setPayloadCount] = useState(0)

  const visiblePayloads = useMemo(() => payloads?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [payloads, rowsPerPage, page])
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - payloadCount || 0) : 0

  // when the count changes but the payload reference does not, update the count manually
  useEffect(() => {
    setPayloadCount(payloads !== undefined ? payloads?.length ?? 0 : 0)
  }, [count, payloads])

  useEffect(() => {
    setRowsPerPage(rowsPerPageProp)
  }, [rowsPerPageProp])

  // If the payload reference changes, assume we have a new list and reset current page
  useEffect(() => {
    setPage(0)
  }, [payloads])

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    if (fetchMorePayloads) {
      const buffer = rowsPerPage * 2
      const lastVisiblePayload = visiblePayloads?.at(-1)
      if (lastVisiblePayload) {
        const lastVisibleIndex = payloads?.indexOf(lastVisiblePayload)
        if (payloads && lastVisibleIndex !== undefined && payloads?.length - (lastVisibleIndex + 1) <= buffer) {
          fetchMorePayloads()
        }
      }
    }
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return breakPoint ? (
    <TableEx variant={variant} {...props}>
      <TableHead>
        <TableRow>
          {columns[breakPoint]?.map((column, index) => {
            return (
              <TableCell key={index} width={index === 0 ? '100%' : undefined} align={index === 0 ? 'left' : 'center'}>
                <Typography variant="body2" noWrap>
                  {payloadColumnNames[column]}
                </Typography>
              </TableCell>
            )
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {visiblePayloads?.map((payload, index) => {
          const wrapper = new PayloadWrapper(payload)
          return (
            <XyoApiThrownErrorBoundary
              key={`${wrapper.hash}-${index}`}
              errorComponent={(e: Error) => (
                <Alert severity="error">
                  Error Loading Payload: <Typography fontWeight="bold">{e.message}</Typography>
                </Alert>
              )}
            >
              <PayloadTableRow
                maxSchemaDepth={maxSchemaDepth}
                archive={archive}
                onClick={
                  onRowClick
                    ? () => {
                        onRowClick(payload)
                      }
                    : undefined
                }
                exploreDomain={exploreDomain}
                payload={payload}
              />
            </XyoApiThrownErrorBoundary>
          )
        })}
        {children}
        {emptyRows > 0 && Array(emptyRows).fill(<PayloadTableRow />)}
      </TableBody>
      <TableFooterEx variant={variant}>
        <TableRow>
          <StyledTablePagination
            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
            count={payloadCount}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: {
                'aria-label': 'rows per page',
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={(props) => <TablePaginationActions enableNextPage={!!fetchMorePayloads} loading={loading} {...props} />}
          />
        </TableRow>
      </TableFooterEx>
    </TableEx>
  ) : null
}

const StyledTablePagination = styled(TablePagination)(({ theme }) => ({
  '& > .MuiToolbar-root': {
    paddingLeft: theme.spacing(1),
  },
  borderTop: '1px solid',
  borderTopColor: theme.palette.divider,
}))
