import { TableCell, TableRow, TableRowProps } from '@mui/material'
import { useBreakpoint } from '@xylabs/react-shared'
import { XyoBoundWitnessValidator, XyoBoundWitnessWithMeta, XyoBoundWitnessWithPartialMeta } from '@xyo-network/boundwitness'
import { useNetwork } from '@xyo-network/react-network'
import { HashTableCell } from '@xyo-network/react-shared'
import compact from 'lodash/compact'
import { DateTime } from 'luxon'
import { ReactElement } from 'react'
import { MdClear, MdDone } from 'react-icons/md'

import { BlockTableColumnConfig, blockTableColumnConfigDefaults, BlockTableColumnSlug } from './BlockTableColumnConfig'

export interface BlockTableRowProps extends TableRowProps {
  block?: XyoBoundWitnessWithPartialMeta
  exploreDomain?: string
  columns?: BlockTableColumnConfig
  network?: string
}

export const BlockTableRow: React.FC<BlockTableRowProps> = ({
  network: networkProp,
  exploreDomain,
  block,
  columns = blockTableColumnConfigDefaults(),
  ...props
}) => {
  const breakPoint = useBreakpoint()

  const timeStamp = block?._timestamp ? DateTime.fromMillis(block?._timestamp) : undefined
  const validator = block ? new XyoBoundWitnessValidator(block as XyoBoundWitnessWithMeta) : undefined
  const { network } = useNetwork()

  const archive = (
    <TableCell key="archive" align="center">
      {block?._archive}
    </TableCell>
  )

  const client = (
    <TableCell key="client" align="center">
      {block?._client}
    </TableCell>
  )

  const date = (
    <TableCell key="date" align="center">
      {timeStamp?.toLocaleString(DateTime.DATE_SHORT)}
    </TableCell>
  )

  const hash = (
    <HashTableCell
      key="hash"
      value={block?._hash}
      archive={block?._archive}
      dataType="block"
      exploreDomain={exploreDomain}
      network={networkProp ?? network?.slug}
    />
  )

  const payloads = (
    <TableCell key="payloads" align="center">
      {compact(block?.payload_hashes ?? []).length}|{compact(block?.addresses ?? []).length}|{compact(block?.previous_hashes ?? [])?.length}
    </TableCell>
  )

  const time = (
    <TableCell key="time" align="center">
      {timeStamp?.toLocaleString(DateTime.TIME_SIMPLE)}
    </TableCell>
  )

  const valid = (
    <TableCell key="valid" align="center">
      {validator?.validate().length === 0 ? <MdDone fontSize={18} color="green" /> : <MdClear color="red" fontSize={18} />}
    </TableCell>
  )

  const tableCells: Record<BlockTableColumnSlug, ReactElement> = {
    archive,
    client,
    date,
    hash,
    payloads,
    time,
    valid,
  }

  return breakPoint ? (
    <TableRow style={{ maxWidth: '100vw' }} {...props}>
      {columns[breakPoint]?.map((column) => {
        return tableCells[column]
      })}
    </TableRow>
  ) : null
}
