import type { Hash } from '@xylabs/hex'
import type { Payload } from '@xyo-network/payload-model'
import type { TableExProps } from '@xyo-network/react-table'
import { TableEx } from '@xyo-network/react-table'
import type { ComponentType } from 'react'
import React, {
  forwardRef, useMemo, useState,
} from 'react'

import type { PayloadTableColumnConfig } from './PayloadTableColumnConfig.ts'
import { PayloadTableBody } from './TableBody.tsx'
import { PayloadTableFooter } from './TableFooter.tsx'
import { PayloadTableHead } from './TableHead.tsx'
import { TableRowNoData } from './TableRowNoData.tsx'
import type {
  PayloadTableBodyProps, PayloadTableFooterProps, PayloadTableHeadProps,
} from './types/index.ts'

export interface PayloadTableProps extends TableExProps {
  PayloadTableBodyComponent?: ComponentType<PayloadTableBodyProps>
  PayloadTableFooterComponent?: ComponentType<PayloadTableFooterProps>
  PayloadTableHeadComponent?: ComponentType<PayloadTableHeadProps>
  archive?: string
  columns?: PayloadTableColumnConfig
  /** Total number of payloads passed */
  count?: number
  exploreDomain?: string
  /** External trigger to fetch more payloads */
  fetchMorePayloads?: () => void
  loading?: boolean
  /** set number of schema parts to display starting from the end */
  maxSchemaDepth?: number
  onHashClick?: (value: Hash) => void
  onRowClick?: (value: Payload) => void
  payloads?: Payload[] | null
  rowsPerPage?: number
}

export const PayloadTableWithRef = forwardRef<HTMLTableElement, PayloadTableProps>(
  (
    {
      exploreDomain,
      archive,
      onHashClick,
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
    const [visiblePayloads, setVisiblePayloads] = useState<Payload[]>([])

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - count || 0) : 0

    useMemo(() => {
      setRowsPerPage(rowsPerPageProp)
    }, [rowsPerPageProp])

    // React to various prop changes to derive new visible payloads
    // count is needed to show initial payloads added async to the same payloads reference
    useMemo(() => {
      if (payloads) {
        setVisiblePayloads(payloads.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))
      }
    }, [count, page, payloads, rowsPerPage])

    // If the payload reference changes, assume we have a new list and reset current page
    useMemo(() => {
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
      setRowsPerPage(Number.parseInt(event.target.value, 10))
      setPage(0)
    }

    const noResults = useMemo(() => {
      return !loading && (!visiblePayloads || visiblePayloads.length === 0)
    }, [loading, visiblePayloads])

    return (
      <TableEx variant={variant} ref={ref} {...props}>
        <PayloadTableHeadComponent columns={columns} />
        <PayloadTableBodyComponent
          payloads={visiblePayloads}
          exploreDomain={exploreDomain}
          archive={archive}
          maxSchemaDepth={maxSchemaDepth}
          onRowClick={onRowClick}
          onHashClick={onHashClick}
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
          page={page}
        />
      </TableEx>
    )
  },
)

PayloadTableWithRef.displayName = 'PayloadTable'

export const PayloadTable = PayloadTableWithRef
