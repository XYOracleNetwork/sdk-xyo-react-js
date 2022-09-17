import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import { Alert, Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableProps, TableRow, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import { useBreakpoint } from '@xylabs/react-shared'
import { PayloadWrapper, XyoPayload } from '@xyo-network/payload'
import { XyoApiThrownErrorBoundary } from '@xyo-network/react-auth-service'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { payloadColumnNames, PayloadTableColumnConfig, payloadTableColumnConfigDefaults } from './PayloadTableColumnConfig'
import { PayloadTableRow } from './TableRow'

export interface PayloadTableProps extends TableProps {
  exploreDomain?: string
  archive?: string
  onRowClick?: (value: XyoPayload) => void
  rowsPerPage?: number
  payloads?: XyoPayload[] | null
  columns?: PayloadTableColumnConfig
  maxSchemaDepth?: number
}

interface TablePaginationActionsProps {
  count: number
  page: number
  rowsPerPage: number
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  )
}

export const PayloadTable: React.FC<PayloadTableProps> = ({
  exploreDomain,
  archive,
  onRowClick,
  rowsPerPage: rowsPerPageProp = 25,
  payloads,
  children,
  columns = payloadTableColumnConfigDefaults(),
  maxSchemaDepth,
  ...props
}) => {
  const theme = useTheme()
  const breakPoint = useBreakpoint()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageProp)
  const payloadCount = payloads ? payloads.length : 0
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - payloadCount) : 0

  useEffect(() => {
    setRowsPerPage(rowsPerPageProp)
  }, [rowsPerPageProp])

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return breakPoint ? (
    <Table stickyHeader {...props}>
      <TableHead style={{ position: 'sticky', top: 0 }}>
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
        {payloads?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((payload, index) => {
          // {payloads?.map((payload, index) => {
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
      <TableFooter style={{ backgroundColor: theme.palette.background.default, bottom: 0, position: 'sticky' }}>
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
      </TableFooter>
    </Table>
  ) : null
}
