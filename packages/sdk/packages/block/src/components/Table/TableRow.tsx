import type { TableRowProps } from '@mui/material'
import { TableCell, TableRow } from '@mui/material'
import { exists } from '@xylabs/exists'
import { usePromise } from '@xylabs/react-promise'
import { useBreakpoint } from '@xylabs/react-shared'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import { BoundWitnessValidator } from '@xyo-network/boundwitness-validator'
import { useNetwork } from '@xyo-network/react-network'
import { HashTableCell, usePayloadHash } from '@xyo-network/react-shared'
import type { ReactElement } from 'react'
import React from 'react'
// eslint-disable-next-line import-x/no-internal-modules
import { MdClear, MdDone } from 'react-icons/md'

import type { BlockTableColumnConfig, BlockTableColumnSlug } from './BlockTableColumnConfig.ts'
import { blockTableColumnConfigDefaults } from './BlockTableColumnConfig.ts'

export interface BlockTableRowProps extends TableRowProps {
  block?: BoundWitness
  columns?: BlockTableColumnConfig
  exploreDomain?: string
  network?: string
}

export const BlockTableRow: React.FC<BlockTableRowProps> = ({
  block,
  columns,
  exploreDomain,
  network: networkProp,
  ...props
}) => {
  const breakPoint = useBreakpoint()

  const { network } = useNetwork()

  const [errors = []] = usePromise(async () => await (block ? new BoundWitnessValidator(block).validate() : undefined), [block])

  const blockHash = usePayloadHash(block)

  const hash = <HashTableCell key="hash" value={blockHash} dataType="block" exploreDomain={exploreDomain} network={networkProp ?? network?.slug} />

  const time = (
    <TableCell key="time" align="center" sx={{ textWrap: 'nowrap' }}>
      {block?.timestamp ? new Date(block?.timestamp as number).toLocaleString(undefined, { timeStyle: 'medium' }) : '--'}
    </TableCell>
  )

  const payloads = (
    <TableCell key="payloads" align="center">
      {(block?.payload_hashes ?? []).filter(exists).length}
      |
      {(block?.addresses ?? []).filter(exists).length}
      |
      {(block?.previous_hashes ?? [])?.filter(exists).length}
    </TableCell>
  )

  const valid = (
    <TableCell key="valid" align="center">
      {errors.length === 0
        ? <MdDone fontSize={18} color="green" />
        : <MdClear color="red" fontSize={18} />}
    </TableCell>
  )

  const tableCells: Record<BlockTableColumnSlug, ReactElement> = {
    hash,
    time,
    payloads,
    valid,
  }

  return breakPoint
    ? (
        <TableRow style={{ maxWidth: '100vw' }} {...props}>
          {(columns ?? blockTableColumnConfigDefaults())[breakPoint]?.map((column) => {
            return tableCells[column]
          })}
        </TableRow>
      )
    : null
}
