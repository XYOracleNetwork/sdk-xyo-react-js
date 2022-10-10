import { Alert, styled, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import { useBreakpoint } from '@xylabs/react-shared'
import { PayloadWrapper, XyoPayload } from '@xyo-network/payload'
import { XyoApiThrownErrorBoundary } from '@xyo-network/react-auth-service'
import { TableEx, TableExProps, TableFooterEx } from '@xyo-network/react-table'
import { forwardRef, useEffect, useState } from 'react'

import { payloadColumnNames, PayloadTableColumnConfig, payloadTableColumnConfigDefaults } from './PayloadTableColumnConfig'
import { TablePaginationActions } from './TablePagination'
import { PayloadTableRow } from './TableRow'

export interface PayloadTableProps extends TableExProps {
  exploreDomain?: string
  archive?: string
  onRowClick?: (value: XyoPayload) => void
  rowsPerPage?: number
  payloads?: XyoPayload[] | null
  loading?: boolean
  columns?: PayloadTableColumnConfig
  /** External trigger to fetch more payloads */
  fetchMorePayloads?: () => void
  /** set number of schema parts to display starting from the end */
  maxSchemaDepth?: number
  /** Total number of payloads passed */
  count?: number
}

export const PayloadTableWithRef = forwardRef<HTMLTableElement, PayloadTableProps>(
  (
    {
      exploreDomain,
      archive,
      onRowClick,
      fetchMorePayloads,
      rowsPerPage: rowsPerPageProp = 25,
      payloads,
      children,
      columns = payloadTableColumnConfigDefaults(),
      maxSchemaDepth,
      count = 0,
      loading = false,
      variant = 'scrollable',
      ...props
    },
    ref,
  ) => {
    const breakPoint = useBreakpoint()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageProp)
    const [visiblePayloads, setVisiblePayloads] = useState<XyoPayload[]>([])

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - count || 0) : 0

    useEffect(() => {
      setRowsPerPage(rowsPerPageProp)
    }, [rowsPerPageProp])

    // React to various prop changes to derive new visible payloads
    // count is needed to show initial payloads added async to the same payloads reference
    useEffect(() => {
      if (payloads) {
        setVisiblePayloads(payloads.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))
      }
    }, [count, page, payloads, rowsPerPage])

    // If the payload reference changes, assume we have a new list and reset current page
    useEffect(() => {
      setPage(0)
    }, [payloads])

    const handleAdditionalPayloads = () => {
      if (fetchMorePayloads && payloads) {
        const buffer = rowsPerPage * 2
        const lastVisiblePayload = visiblePayloads?.at(-1)
        if (lastVisiblePayload) {
          const lastVisibleIndex = payloads?.indexOf(lastVisiblePayload)
          if (lastVisibleIndex !== undefined && payloads.length - (lastVisibleIndex + 1) <= buffer) {
            fetchMorePayloads()
          }
        }
      }
    }

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      handleAdditionalPayloads()
      setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10))
      setPage(0)
    }

    return breakPoint ? (
      <TableEx variant={variant} ref={ref} {...props}>
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
              count={count ?? 0}
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
  },
)

PayloadTableWithRef.displayName = 'PayloadTable'

export const PayloadTable = PayloadTableWithRef

const StyledTablePagination = styled(TablePagination)(({ theme }) => ({
  '& > .MuiToolbar-root': {
    paddingLeft: theme.spacing(1),
  },
  borderTop: '1px solid',
  borderTopColor: theme.palette.divider,
}))
