import { TableBody, TableCell, TableRow } from '@mui/material'
import { useXyoEvent, XyoEventNoun } from '@xyo-network/react-event'
import { PayloadTableBodyProps, TableRowNoData } from '@xyo-network/react-payload-table'
import { HashTableCell } from '@xyo-network/react-shared'
import { useTableHeight } from '@xyo-network/react-table'
import { useLayoutEffect, useRef } from 'react'

export interface BoundWitnessPayloadTableBodyProps extends PayloadTableBodyProps {
  payloadHashes?: string[]
  payloadSchemas?: string[]
  eventNoun?: XyoEventNoun
}

export const BoundWitnessPayloadTableBody: React.FC<BoundWitnessPayloadTableBodyProps> = ({
  payloadHashes,
  payloadSchemas,
  eventNoun = 'payload',
  ...props
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { payloads, archive, maxSchemaDepth, onRowClick, exploreDomain, emptyRows, noResults, NoResultRowComponent, ...tableProps } = props
  const ref = useRef<HTMLTableSectionElement | null>(null)
  const [tableRef, dispatch] = useXyoEvent<HTMLTableSectionElement>(undefined, ref)

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
      {noResults && NoResultRowComponent ? <NoResultRowComponent /> : null}
      {(payloadHashes &&
        payloadSchemas &&
        payloadHashes.length > 0 &&
        payloadHashes?.map((hash, index) => {
          return (
            <TableRow ref={tableRowRef} key={hash + index} onClick={() => handleOnClick(hash)} sx={{ cursor: 'pointer' }}>
              <TableCell title={payloadSchemas[index]}>{payloadSchemas[index]}</TableCell>
              <HashTableCell title={hash}>{hash}</HashTableCell>
            </TableRow>
          )
        })) || (
        <>
          <TableRowNoData additionalCells={1} />
        </>
      )}
    </TableBody>
  )
}
