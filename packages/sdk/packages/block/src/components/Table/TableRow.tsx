import { TableCell, TableRow, TableRowProps } from '@mui/material'
import { compact } from '@xylabs/lodash'
import { usePromise } from '@xylabs/react-promise'
import { useBreakpoint } from '@xylabs/react-shared'
import { BoundWitness } from '@xyo-network/boundwitness-model'
import { BoundWitnessValidator } from '@xyo-network/boundwitness-validator'
import { useNetwork } from '@xyo-network/react-network'
import { HashTableCell, usePayloadHash } from '@xyo-network/react-shared'
import { ReactElement } from 'react'
// eslint-disable-next-line import/no-internal-modules
import { MdClear, MdDone } from 'react-icons/md/index.js'

import { BlockTableColumnConfig, blockTableColumnConfigDefaults, BlockTableColumnSlug } from './BlockTableColumnConfig'

export interface BlockTableRowProps extends TableRowProps {
  block?: BoundWitness
  columns?: BlockTableColumnConfig
  exploreDomain?: string
  network?: string
}

export const BlockTableRow: React.FC<BlockTableRowProps> = ({
  block,
  columns = blockTableColumnConfigDefaults(),
  exploreDomain,
  network: networkProp,
  ...props
}) => {
  const breakPoint = useBreakpoint()

  const { network } = useNetwork()

  const [errors = []] = usePromise(async () => await (block ? new BoundWitnessValidator(block).validate() : undefined), [block])

  const blockHash = usePayloadHash(block)

  const hash = <HashTableCell key="hash" value={blockHash} dataType="block" exploreDomain={exploreDomain} network={networkProp ?? network?.slug} />

  const payloads = (
    <TableCell key="payloads" align="center">
      {compact(block?.payload_hashes ?? []).length}|{compact(block?.addresses ?? []).length}|{compact(block?.previous_hashes ?? [])?.length}
    </TableCell>
  )

  const valid = (
    <TableCell key="valid" align="center">
      {errors.length === 0 ? <MdDone fontSize={18} color="green" /> : <MdClear color="red" fontSize={18} />}
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
