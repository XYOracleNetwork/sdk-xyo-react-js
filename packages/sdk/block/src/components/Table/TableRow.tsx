import { TableCell, TableRow, TableRowProps } from '@mui/material'
import { useBreakpoint } from '@xylabs/react-shared'
import { XyoBoundWitness, XyoBoundWitnessValidator, XyoBoundWitnessWrapper } from '@xyo-network/boundwitness'
import { useNetwork } from '@xyo-network/react-network'
import { HashTableCell } from '@xyo-network/react-shared'
import compact from 'lodash/compact'
import { ReactElement } from 'react'
import { MdClear, MdDone } from 'react-icons/md'

import { BlockTableColumnConfig, blockTableColumnConfigDefaults, BlockTableColumnSlug } from './BlockTableColumnConfig'

export interface BlockTableRowProps extends TableRowProps {
  block?: XyoBoundWitness
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

  const validator = block ? new XyoBoundWitnessValidator(block) : undefined
  const { network } = useNetwork()

  const wrapper = block ? new XyoBoundWitnessWrapper(block) : undefined

  const hash = <HashTableCell key="hash" value={wrapper?.hash} dataType="block" exploreDomain={exploreDomain} network={networkProp ?? network?.slug} />

  const payloads = (
    <TableCell key="payloads" align="center">
      {compact(block?.payload_hashes ?? []).length}|{compact(block?.addresses ?? []).length}|{compact(block?.previous_hashes ?? [])?.length}
    </TableCell>
  )

  const valid = (
    <TableCell key="valid" align="center">
      {validator?.validate().length === 0 ? <MdDone fontSize={18} color="green" /> : <MdClear color="red" fontSize={18} />}
    </TableCell>
  )

  const tableCells: Record<BlockTableColumnSlug, ReactElement> = {
    hash,
    payloads,
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
