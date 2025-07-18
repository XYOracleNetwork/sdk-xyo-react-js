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

export type ClickableFields = 'hash' | 'schema'

export interface BoundWitnessPayloadTableBodyProps<TNoun extends ExtendEventNoun<string> = EventNoun> extends PayloadTableBodyProps {
  clickableFields?: ClickableFields[]
  eventNoun?: TNoun
  payloadHashes?: string[]
  payloadSchemas?: string[]
}

export const BoundWitnessPayloadTableBody = <
  TNoun extends ExtendEventNoun<string> = EventNoun,
>({
  clickableFields,
  eventNoun: eventNounOverride,
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
  const [tableRowRef, dispatch] = useEvent<HTMLTableRowElement, TNoun>(undefined, ref as RefObject<HTMLTableRowElement | null> | undefined)

  useLayoutEffect(() => {
    if (tableRowRef.current) {
      setRowHeight?.(tableRowRef.current.offsetHeight)
    }
  })

  const RenderedCell: React.FC<{ field: ClickableFields; value: string }> = ({ field, value }) => {
    return clickableFields?.includes(field)
      ? (
          <Link
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              dispatch (eventNounOverride ?? field as TNoun, 'click', value)
            }}
          >
            {value}
          </Link>
        )
      : value
  }

  return (
    <TableBody {...tableProps}>
      {noResults && NoResultRowComponent
        ? <NoResultRowComponent />
        : null}
      {payloadHashes && payloadSchemas && payloadHashes.length > 0
        ? payloadHashes.map((hash, index) => {
            return (
              <TableRow ref={tableRowRef} key={hash}>
                <TableCell title={payloadSchemas[index]}>
                  <RenderedCell field="schema" value={payloadSchemas[index]} />
                </TableCell>
                <HashTableCell title={hash} value={hash}>
                  <RenderedCell field="hash" value={hash} />
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
