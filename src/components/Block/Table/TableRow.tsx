import { TableCell, TableRow, TableRowProps, Typography } from '@mui/material'
import { useBreakpoint } from '@xylabs/sdk-react'
import { XyoBoundWitness, XyoBoundWitnessWrapper } from '@xyo-network/sdk-xyo-client-js'
import compact from 'lodash/compact'
import { DateTime } from 'luxon'
import { ReactElement } from 'react'
import { MdClear, MdDone } from 'react-icons/md'

import { HashTableCell } from '../../TableCell'
import { BlockTableColumnConfig, blockTableColumnConfigDefaults, BlockTableColumnSlug } from './BlockTableColumnConfig'

export interface BlockTableRowProps extends TableRowProps {
  block?: XyoBoundWitness
  exploreDomain?: string
  columns?: BlockTableColumnConfig
}

export const BlockTableRow: React.FC<BlockTableRowProps> = ({
  exploreDomain,
  block,
  columns = blockTableColumnConfigDefaults(),
  ...props
}) => {
  const breakPoint = useBreakpoint()

  const timeStamp = block?._timestamp ? DateTime.fromMillis(block?._timestamp) : undefined
  const wrapper = block ? new XyoBoundWitnessWrapper(block) : undefined
  const tableCells: Record<BlockTableColumnSlug, ReactElement> = {
    archive: (
      <TableCell key="archive" align="center">
        <Typography fontFamily="monospace" variant="body2" noWrap>
          {block?._archive}
        </Typography>
      </TableCell>
    ),
    client: (
      <TableCell key="client" align="center">
        <Typography fontFamily="monospace" variant="body2" noWrap>
          {block?._client}
        </Typography>
      </TableCell>
    ),
    date: (
      <TableCell key="date" align="center">
        <Typography fontFamily="monospace" variant="body2" noWrap>
          {timeStamp?.toLocaleString(DateTime.DATE_SHORT)}
        </Typography>
      </TableCell>
    ),
    hash: (
      <HashTableCell
        key="hash"
        value={block?._hash}
        archive={block?._archive}
        dataType="block"
        exploreDomain={exploreDomain}
      />
    ),
    payloads: (
      <TableCell key="payloads" align="center">
        <Typography fontFamily="monospace" variant="body2" noWrap>
          {compact(block?.payload_hashes ?? []).length}|{compact(block?.addresses ?? []).length}|
          {compact(block?.previous_hashes ?? [])?.length}
        </Typography>
      </TableCell>
    ),
    time: (
      <TableCell key="time" align="center">
        <Typography fontFamily="monospace" variant="body2" noWrap>
          {timeStamp?.toLocaleString(DateTime.TIME_SIMPLE)}
        </Typography>
      </TableCell>
    ),
    valid: (
      <TableCell key="valid" align="center">
        <Typography fontFamily="monospace" variant="body2" noWrap>
          {wrapper?.validator.all().length === 0 ? (
            <MdDone fontSize={18} color="green" />
          ) : (
            <MdClear color="red" fontSize={18} />
          )}
        </Typography>
      </TableCell>
    ),
  }

  return breakPoint ? (
    <TableRow style={{ maxWidth: '100vw' }} {...props}>
      {columns[breakPoint]?.map((column) => {
        return tableCells[column]
      })}
    </TableRow>
  ) : null
}
