import { Alert, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useBreakpoint } from '@xylabs/react-shared'
import { PayloadWrapper, XyoPayload } from '@xyo-network/payload'
import { XyoApiThrownErrorBoundary } from '@xyo-network/react-auth-service'
import { TableEx, TableExProps, TableFooterEx } from '@xyo-network/react-table'
import { useEffect, useMemo, useState } from 'react'

import { payloadColumnNames, PayloadTableColumnConfig, payloadTableColumnConfigDefaults } from './PayloadTableColumnConfig'
import { PayloadTableRow } from './TableRow'
export interface PayloadTableProps extends TableExProps {
  exploreDomain?: string
  archive?: string
  onRowClick?: (value: XyoPayload) => void
  onMorePayloads?: () => void
  rowsPerPage?: number
  payloads?: XyoPayload[] | null
  columns?: PayloadTableColumnConfig
  maxSchemaDepth?: number
  count?: number | null
}

export const PayloadTable: React.FC<PayloadTableProps> = ({
  exploreDomain,
  archive,
  onRowClick,
  onMorePayloads,
  rowsPerPage: rowsPerPageProp = 25,
  payloads,
  children,
  columns = payloadTableColumnConfigDefaults(),
  maxSchemaDepth,
  count,
  variant = 'scrollable',
  ...props
}) => {
  const theme = useTheme()
  const breakPoint = useBreakpoint()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageProp)
  const payloadCount = count ?? payloads !== undefined ? payloads?.length ?? 0 : 0
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - payloadCount || 0) : 0

  useEffect(() => {
    setRowsPerPage(rowsPerPageProp)
  }, [rowsPerPageProp])

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    if (onMorePayloads) {
      const buffer = rowsPerPage * 2
      const lastVisiblePayload = visiblePayloads?.at(-1)
      if (lastVisiblePayload) {
        const lastVisibleIndex = payloads?.indexOf(lastVisiblePayload)
        if (payloads && lastVisibleIndex !== undefined && payloads?.length - (lastVisibleIndex + 1) <= buffer) {
          onMorePayloads()
        }
      }
    }
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const visiblePayloads = useMemo(() => payloads?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [payloads, rowsPerPage, page])

  // identify if last visible payload === last passed payload
  // allow one more advancement to fetch more payloads (emit event?)
  // show loading indicator in table footer

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
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
            count={payloadCount}
            rowsPerPage={rowsPerPage}
            page={page}
            style={{ borderTop: '1px solid', borderTopColor: theme.palette.divider }}
            SelectProps={{
              inputProps: {
                'aria-label': 'rows per page',
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </TableRow>
      </TableFooterEx>
    </TableEx>
  ) : null
}
