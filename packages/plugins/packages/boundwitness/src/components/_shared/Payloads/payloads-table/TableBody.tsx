import {
  TableBody, TableCell, TableRow,
} from '@mui/material'
import type { EventNoun } from '@xyo-network/react-event'
import { useEvent } from '@xyo-network/react-event'
import type { PayloadTableBodyProps } from '@xyo-network/react-payload-table'
import { TableRowNoData } from '@xyo-network/react-payload-table'
import { HashTableCell } from '@xyo-network/react-shared'
import { useTableHeight } from '@xyo-network/react-table'
import React, { useLayoutEffect, useRef } from 'react'

export interface BoundWitnessPayloadTableBodyProps extends PayloadTableBodyProps {
  boundwitnessHash?: string
  eventNoun?: EventNoun
  payloadHashes?: string[]
  payloadSchemas?: string[]
}

export const BoundWitnessPayloadTableBody: React.FC<BoundWitnessPayloadTableBodyProps> = ({
  boundwitnessHash,
  eventNoun = 'payload',
  payloadHashes,
  payloadSchemas,
  ...props
}) => {
  const {
    // payloads, archive, maxSchemaDepth, onRowClick, exploreDomain, emptyRows,
    noResults, NoResultRowComponent, ...tableProps
  } = props
  const ref = useRef<HTMLTableSectionElement | null>(null)
  const [tableRef, dispatch] = useEvent<HTMLTableSectionElement>(undefined, ref)

  const { setRowHeight } = useTableHeight()
  const tableRowRef = useRef<HTMLTableRowElement | null>(null)

  const handleOnClick = (hash: string) => {
    dispatch(eventNoun, 'click', hash)
  }

  useLayoutEffect(() => {
    if (tableRowRef.current) {
      setRowHeight?.(tableRowRef.current.offsetHeight)
    }
  })

  return (
    <TableBody ref={tableRef} {...tableProps}>
      {noResults && NoResultRowComponent
        ? <NoResultRowComponent />
        : null}
      {(
        payloadHashes
        && payloadSchemas
        && payloadHashes.length > 0
        && payloadHashes?.map((hash, index) => {
          return (
            <TableRow ref={tableRowRef} key={boundwitnessHash + hash} onClick={() => handleOnClick(hash)} sx={{ cursor: 'pointer' }}>
              <TableCell title={payloadSchemas[index]}>{payloadSchemas[index]}</TableCell>
              <HashTableCell title={hash}>{hash}</HashTableCell>
            </TableRow>
          )
        })) || (
        <TableRowNoData additionalCells={1} />
      )}
    </TableBody>
  )
}
