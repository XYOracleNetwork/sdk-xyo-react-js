import type { TableRowProps } from '@mui/material'
import {
  Link, TableCell, TableRow,
} from '@mui/material'
import { usePromise } from '@xylabs/react-promise'
import { useBreakpoint } from '@xylabs/react-shared'
import { exists, isDefined } from '@xylabs/sdk-js'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import { BoundWitnessValidator } from '@xyo-network/boundwitness-validator'
import { useEvent } from '@xyo-network/react-event'
import { HashTableCell, usePayloadHash } from '@xyo-network/react-shared'
import type { ReactElement } from 'react'
import React, { useMemo } from 'react'
// eslint-disable-next-line import-x/no-internal-modules
import { MdClear, MdDone } from 'react-icons/md'

import type { BlockTableColumnConfig, BlockTableColumnSlug } from './BlockTableColumnConfig.ts'
import { blockTableColumnConfigDefaults } from './BlockTableColumnConfig.ts'

export interface BlockTableRowProps extends TableRowProps {
  block?: BoundWitness
  clickableFields?: BlockTableColumnSlug[]
  columns?: BlockTableColumnConfig
  /** @deprecated - use events to build links instead of passing props */
  exploreDomain?: string
  /** @deprecated - use events to build links instead of passing props */
  network?: string
}

export const BlockTableRow: React.FC<BlockTableRowProps> = ({
  block,
  clickableFields,
  columns,
  ...props
}) => {
  const breakPoint = useBreakpoint()
  const blockHash = usePayloadHash(block)
  const [errors = []] = usePromise(async () => await (block ? new BoundWitnessValidator(block).validate() : undefined), [block])

  const [ref, dispatch] = useEvent<HTMLAnchorElement>()

  const hash = useMemo(() => (
    <HashTableCell key="hash" value={blockHash} dataType="block">
      {clickableFields?.includes('hash')
        ? (
            <Link
              onClick={() => dispatch('hash', 'click', blockHash)}
              ref={ref}
              sx={{ cursor: 'pointer' }}
            >
              {blockHash}
            </Link>
          )
        : blockHash}
    </HashTableCell>
  ), [blockHash])

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
    payloads,
    valid,
  }

  return isDefined(breakPoint)
    ? (
        <TableRow style={{ maxWidth: '100vw' }} {...props}>
          {(columns ?? blockTableColumnConfigDefaults())[breakPoint]?.map((column) => {
            return tableCells[column]
          })}
        </TableRow>
      )
    : null
}
