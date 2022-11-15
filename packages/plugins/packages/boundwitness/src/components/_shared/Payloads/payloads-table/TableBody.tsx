import { TableBody, TableCell, TableRow } from '@mui/material'
import { useXyoEvent } from '@xyo-network/react-event'
import { PayloadTableBodyProps } from '@xyo-network/react-payload-table'
import { HashTableCell } from '@xyo-network/react-shared'
import { useRef } from 'react'

interface BoundWitnessPayloadTableBodyProps extends PayloadTableBodyProps {
  payloadHashes?: string[]
  payloadSchemas?: string[]
}

export const BoundWitnessPayloadTableBody: React.FC<BoundWitnessPayloadTableBodyProps> = ({ payloadHashes, payloadSchemas, ...props }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { payloads, archive, maxSchemaDepth, onRowClick, exploreDomain, emptyRows, noResults, NoResultRowComponent, ...tableProps } = props
  const ref = useRef<HTMLTableSectionElement | null>(null)
  const [tableRef, dispatch] = useXyoEvent<HTMLTableSectionElement>(undefined, ref)

  const handleOnClick = (hash: string) => {
    dispatch('payload', 'click', hash)
  }

  return (
    <TableBody ref={tableRef} {...tableProps}>
      {noResults && NoResultRowComponent ? <NoResultRowComponent /> : null}
      {payloadHashes &&
        payloadSchemas &&
        payloadHashes?.map((hash, index) => {
          return (
            <TableRow key={hash + index} onClick={() => handleOnClick(hash)} sx={{ cursor: 'pointer' }}>
              <TableCell title={payloadSchemas[index]}>{payloadSchemas[index]}</TableCell>
              <HashTableCell title={hash}>{hash}</HashTableCell>
            </TableRow>
          )
        })}
    </TableBody>
  )
}
