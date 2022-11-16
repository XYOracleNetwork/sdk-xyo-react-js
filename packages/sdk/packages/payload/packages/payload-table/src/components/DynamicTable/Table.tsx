import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
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
  TableProps,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material'
import { useBreakpoint } from '@xylabs/react-shared'
import { PayloadWrapper, XyoPayload } from '@xyo-network/payload'
import { XyoThrownErrorBoundary } from '@xyo-network/react-error'
import { useEffect, useState } from 'react'

import { PayloadDynamicTableRow } from './DynamicTableRow'
import { PayloadDynamicTableColumnConfig, payloadDynamicTableColumnConfigDefaults } from './PayloadDynamicTableColumnConfig'

export interface PayloadDynamicTableProps extends TableProps {
  exploreDomain?: string
  archive?: string
  onRowClick?: (value: XyoPayload) => void
  rowsPerPage?: number
  payloads?: XyoPayload[] | null
  columns?: PayloadDynamicTableColumnConfig
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

export const PayloadDynamicTable: React.FC<PayloadDynamicTableProps> = ({
  exploreDomain,
  archive,
  onRowClick,
  rowsPerPage: rowsPerPageProp = 10,
  payloads,
  children,
  columns = payloadDynamicTableColumnConfigDefaults(),
  ...props
}) => {
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
      <TableHead>
        <TableRow>
          {columns[breakPoint]?.map((column, index) => {
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
        {payloads?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((payload, index) => {
          const wrapper = new PayloadWrapper(payload)
          return (
            <XyoThrownErrorBoundary
              boundaryName="PayloadTableBody"
              key={`${wrapper.hash}-${index}`}
              errorComponent={(e) => (
                <Alert severity="error">
                  Error Loading Payload: <Typography fontWeight="bold">{e.message}</Typography>
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
            </XyoThrownErrorBoundary>
          )
        })}
        {children}
        {emptyRows > 0 && Array(emptyRows).fill(<PayloadDynamicTableRow />)}
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
