import {
  Link,
  TableBody, TableCell, TableRow,
} from '@mui/material'
import type { EventNoun, ExtendEventNoun } from '@xyo-network/react-event'
import { useEvent } from '@xyo-network/react-event'
import type { PayloadTableBodyProps } from '@xyo-network/react-payload-table'
import { TableRowNoData } from '@xyo-network/react-payload-table'
import { HashTableCell } from '@xyo-network/react-shared'
import { useTableHeight } from '@xyo-network/react-table'
import type { RefObject } from 'react'
import React, { useLayoutEffect } from 'react'

type clickableFields = 'hash'

export interface BoundWitnessPayloadTableBodyProps<TNoun extends ExtendEventNoun = EventNoun> extends PayloadTableBodyProps {
  clickableFields?: clickableFields[]
  eventNoun?: TNoun
  payloadHashes?: string[]
  payloadSchemas?: string[]
}

export const BoundWitnessPayloadTableBody = <TNoun extends ExtendEventNoun = EventNoun>({
  clickableFields,
  eventNoun = 'payload' as TNoun,
  payloadHashes,
  payloadSchemas,
  ref,
  ...props
}: BoundWitnessPayloadTableBodyProps<TNoun>) => {
  const {
    // payloads, archive, maxSchemaDepth, onRowClick, exploreDomain, emptyRows,
    noResults, NoResultRowComponent, ...tableProps
  } = props

  const { setRowHeight } = useTableHeight()
  const [tableRowRef, dispatch] = useEvent<HTMLTableRowElement>(undefined, ref as RefObject<HTMLTableRowElement | null> | undefined)

  const handleOnClick = (hash: string) => {
    dispatch(eventNoun, 'click', hash)
  }

  useLayoutEffect(() => {
    if (tableRowRef.current) {
      setRowHeight?.(tableRowRef.current.offsetHeight)
    }
  })

  return (
    <TableBody {...tableProps}>
      {noResults && NoResultRowComponent
        ? <NoResultRowComponent />
        : null}
      {payloadHashes && payloadSchemas && payloadHashes.length > 0
        ? payloadHashes.map((hash, index) => {
            return (
              <TableRow ref={tableRowRef} key={hash} onClick={() => handleOnClick(hash)}>
                <TableCell title={payloadSchemas[index]}>{payloadSchemas[index]}</TableCell>
                <HashTableCell title={hash}>
                  {clickableFields?.includes('hash')
                    ? (
                        <Link>
                          {hash}
                        </Link>
                      )
                    : hash}
                </HashTableCell>
              </TableRow>
            )
          })
        : (
            <TableRowNoData additionalCells={1} />
          )}
    </TableBody>
  )
}
