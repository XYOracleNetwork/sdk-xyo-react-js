import type { TableCellProps } from '@mui/material'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,
} from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol } from '@xylabs/react-flexbox'
import type { Payload } from '@xyo-network/payload-model'
import type { UniswapCryptoMarketPayload } from '@xyo-network/uniswap-crypto-market-payload-plugin'
import React, { useState } from 'react'

import { UniswapTableRowRender } from './TableRow.tsx'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getComparator<Key extends string>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy)
}

interface HeadCell {
  align: TableCellProps['align']
  disablePadding: boolean
  id: string
  label: string
  numeric: boolean
}

const headCells: readonly HeadCell[] = [
  {
    align: 'center',
    disablePadding: false,
    id: 'pair',
    label: 'Token Pair',
    numeric: false,
  },
  {
    align: 'right',
    disablePadding: false,
    id: 'symbol0',
    label: 'Symbol',
    numeric: true,
  },
  {
    align: 'right',
    disablePadding: false,
    id: 'value0',
    label: 'Value',
    numeric: true,
  },
  {
    align: 'right',
    disablePadding: false,
    id: 'symbol1',
    label: 'Symbol',
    numeric: true,
  },
  {
    align: 'right',
    disablePadding: false,
    id: 'value1',
    label: 'Value',
    numeric: true,
  },
]

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void
  order: Order
  orderBy: string | number
  rowCount: number
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    order, orderBy,
  } = props
  // const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
  //   onRequestSort(event, property)
  // }

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
            {/* <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel> */}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
interface UniswapPairsRendererProps extends FlexBoxProps {
  payload?: Payload
}

export const UniswapPairsTableView: React.FC<UniswapPairsRendererProps> = ({
  payload, ...props
}) => {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<string>('symbol')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const handleRequestSort = (_: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }
  const uniswapPayload = payload ? (payload as UniswapCryptoMarketPayload) : undefined
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - (uniswapPayload?.pairs.length ?? 0)) : 0
  return (
    <FlexCol alignItems="flex-start" {...props}>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
          <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} rowCount={uniswapPayload?.pairs.length ?? 0} />
          <TableBody>
            {[...(uniswapPayload?.pairs ?? [])]
              // .sort(getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((pair, index: number) => {
                return <UniswapTableRowRender key={index} tokenPair={pair} />
              })}
            {emptyRows > 0 && (
              <TableRow>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[20, 30, 40]}
          component="div"
          count={uniswapPayload?.pairs.length ?? 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </FlexCol>
  )
}
