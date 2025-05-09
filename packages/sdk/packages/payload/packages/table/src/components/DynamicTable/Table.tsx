import {
  FirstPage as FirstPageIcon, KeyboardArrowLeft, KeyboardArrowRight, LastPage as LastPageIcon,
} from '@mui/icons-material'
import type { TableProps } from '@mui/material'
import {
  Alert,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material'
import { ThrownErrorBoundary } from '@xylabs/react-error'
import { useResetState } from '@xylabs/react-hooks'
import { useBreakpoint } from '@xylabs/react-shared'
import type { Payload } from '@xyo-network/payload-model'
import { usePayloadHashes } from '@xyo-network/react-shared'
import type { ReactNode } from 'react'
import React, { useMemo, useState } from 'react'

import { PayloadDynamicTableRow } from './DynamicTableRow.tsx'
import type { PayloadDynamicTableColumnConfig } from './PayloadDynamicTableColumnConfig.ts'
import { payloadDynamicTableColumnConfigDefaults } from './PayloadDynamicTableColumnConfig.ts'

export interface PayloadDynamicTableProps extends TableProps {
  archive?: string
  columns?: PayloadDynamicTableColumnConfig
  exploreDomain?: string
  onRowClick?: (value: Payload) => void
  payloads?: Payload[] | null
  rowsPerPage?: number
}

interface TablePaginationActionsProps {
  count: number
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void
  page: number
  rowsPerPage: number
}

const TablePaginationActions: React.FC<TablePaginationActionsProps> = (props) => {
  const theme = useTheme()
  const {
    count, page, rowsPerPage, onPageChange,
  } = props

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
        {theme.direction === 'rtl'
          ? <LastPageIcon />
          : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl'
          ? <KeyboardArrowRight />
          : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
        {theme.direction === 'rtl'
          ? <KeyboardArrowLeft />
          : <KeyboardArrowRight />}
      </IconButton>
      <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
        {theme.direction === 'rtl'
          ? <FirstPageIcon />
          : <LastPageIcon />}
      </IconButton>
    </Box>
  )
}

export const PayloadDynamicTable: React.FC<PayloadDynamicTableProps> = ({
  archive,
  children,
  columns,
  exploreDomain,
  onRowClick,
  rowsPerPage: rowsPerPageProp = 10,
  payloads,
  ...props
}) => {
  const breakPoint = useBreakpoint()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useResetState(rowsPerPageProp)
  const payloadCount = payloads ? payloads.length : 0
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - payloadCount) : 0

  const pagedPayloads = useMemo(() => payloads?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [payloads, page, rowsPerPage])

  const payloadPairs = usePayloadHashes(pagedPayloads)

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  return breakPoint
    ? (
        <Table stickyHeader {...props}>
          <TableHead>
            <TableRow>
              {(columns ?? payloadDynamicTableColumnConfigDefaults())[breakPoint]?.map((column, index) => {
                return (
                  <TableCell key={index} align={column.alignment ?? 'left'} width={column.width}>
                    <Typography variant="body2" noWrap>
                      {column.name}
                    </Typography>
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody sx={{ overflowY: 'scroll ' }}>
            {payloadPairs?.map(([payload, hash], index) => {
              return (
                <ThrownErrorBoundary
                  boundaryName="PayloadTableBody"
                  key={`${hash}-${index}`}
                  errorComponent={e => (
                    <Alert severity="error">
                      Error Loading Payload:
                      {' '}
                      <Typography fontWeight="bold">{e.message}</Typography>
                    </Alert>
                  )}
                >
                  <PayloadDynamicTableRow
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
                </ThrownErrorBoundary>
              )
            })}
            {children}
            {emptyRows ? (Array.from({ length: emptyRows }).fill(<PayloadDynamicTableRow />) as ReactNode[]) : null}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={5}
                count={payloadCount}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      )
    : null
}
