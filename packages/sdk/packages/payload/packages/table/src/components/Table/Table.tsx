import { XyoPayload } from '@xyo-network/payload-model'
import { TableEx, TableExProps } from '@xyo-network/react-table'
import { ComponentType, forwardRef, useEffect, useMemo, useState } from 'react'

import { PayloadTableColumnConfig } from './PayloadTableColumnConfig'
import { PayloadTableBody } from './TableBody'
import { PayloadTableFooter } from './TableFooter'
import { PayloadTableHead } from './TableHead'
import { TableRowNoData } from './TableRowNoData'
import { PayloadTableBodyProps, PayloadTableFooterProps, PayloadTableHeadProps } from './types'

export interface PayloadTableProps extends TableExProps {
  exploreDomain?: string
  archive?: string
  onRowClick?: (value: XyoPayload) => void
  rowsPerPage?: number
  payloads?: XyoPayload[] | null
  loading?: boolean
  columns?: PayloadTableColumnConfig
  PayloadTableHeadComponent?: ComponentType<PayloadTableHeadProps>
  PayloadTableBodyComponent?: ComponentType<PayloadTableBodyProps>
  PayloadTableFooterComponent?: ComponentType<PayloadTableFooterProps>
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
      columns,
      PayloadTableHeadComponent = PayloadTableHead,
      PayloadTableBodyComponent = PayloadTableBody,
      PayloadTableFooterComponent = PayloadTableFooter,
      maxSchemaDepth,
      count = 0,
      loading = false,
      variant = 'scrollable',
      ...props
    },
    ref,
  ) => {
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

    const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      handleAdditionalPayloads()
      setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10))
      setPage(0)
    }

    const noResults = useMemo(() => {
      return !loading && (!payloads || payloads.length === 0)
    }, [loading, payloads])

    return (
      <TableEx variant={variant} ref={ref} {...props}>
        <PayloadTableHeadComponent columns={columns} />
        <PayloadTableBodyComponent
          payloads={visiblePayloads}
          exploreDomain={exploreDomain}
          archive={archive}
          maxSchemaDepth={maxSchemaDepth}
          onRowClick={onRowClick}
          emptyRows={emptyRows}
          noResults={noResults}
          NoResultRowComponent={TableRowNoData}
        />
        <PayloadTableFooterComponent
          count={count}
          variant={variant}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          fetchMorePayloads={fetchMorePayloads}
          loading={loading}
        />
      </TableEx>
    )
  },
)

PayloadTableWithRef.displayName = 'PayloadTable'

export const PayloadTable = PayloadTableWithRef
