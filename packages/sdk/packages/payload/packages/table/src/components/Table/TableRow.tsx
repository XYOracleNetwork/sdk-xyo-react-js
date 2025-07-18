import {
  CheckCircleOutlineRounded as CheckCircleOutlineRoundedIcon,
  ErrorOutlineRounded as ErrorOutlineRoundedIcon,
  WarningAmberRounded as WarningAmberRoundedIcon,
} from '@mui/icons-material'
import type { TableRowProps } from '@mui/material'
import {
  alpha, Link, TableCell, TableRow, Typography,
} from '@mui/material'
import type { Hash } from '@xylabs/hex'
import { usePromise } from '@xylabs/react-promise'
import { useBreakpoint } from '@xylabs/react-shared'
import { isDefined } from '@xylabs/typeof'
import type { Payload } from '@xyo-network/payload-model'
import { PayloadValidator } from '@xyo-network/payload-validator'
import { useEvent } from '@xyo-network/react-event'
import { HashTableCell, usePayloadHash } from '@xyo-network/react-shared'
import React, { useMemo } from 'react'

import type { TableCellRenderer } from '../lib/index.ts'
import type { PayloadTableColumnConfig, PayloadTableColumnSlug } from './PayloadTableColumnConfig.ts'
import { payloadTableColumnConfigDefaults } from './PayloadTableColumnConfig.ts'

export interface PayloadTableRowProps extends TableRowProps {
  /** @deprecated - archives are no longer used */
  archive?: string
  clickableFields?: PayloadTableColumnSlug[]
  columns?: PayloadTableColumnConfig
  /** @deprecated - use event listeners instead of link building via props */
  exploreDomain?: string
  maxSchemaDepth?: number
  network?: string
  onHashClick?: (value: Hash) => void
  payload?: Payload
}

export const PayloadTableRow: React.FC<PayloadTableRowProps> = ({
  clickableFields,
  columns,
  maxSchemaDepth,
  network: networkProp,
  onHashClick,
  payload,
  ...props
}) => {
  const breakPoint = useBreakpoint()
  const payloadHash = usePayloadHash(payload)
  const [anchorRef, dispatch] = useEvent<HTMLAnchorElement>()
  const [errors = []] = usePromise(async () => (payload ? await new PayloadValidator(payload).validate() : undefined), [payload])
  const isValid = errors.length === 0

  const hash: TableCellRenderer = props => (
    <HashTableCell
      dataType="payload"
      key="hash"
      onHashClick={onHashClick}
      value={payloadHash}
      width="100%"
      {...props}
    >
      {isDefined(payloadHash) && (
        <>
          {clickableFields?.includes('hash')
            ? (
                <Link onClick={() => dispatch('hash', 'click', payloadHash)} ref={anchorRef} sx={{ cursor: 'pointer' }}>{payloadHash}</Link>
              )
            : payloadHash}
        </>
      )}
    </HashTableCell>
  )

  const reduceSchemaDepth = (schema?: string, maxSchemaDepth?: number) => {
    if (isDefined(maxSchemaDepth)) {
      const parts = schema?.split('.') ?? []
      const partsToRemove = Math.max(parts.length - maxSchemaDepth, 0)
      if (partsToRemove > 0) {
        return (
          <>
            <>&#x2026;</>
            {

              `${parts.slice(partsToRemove).reduce((previousValue, part) => previousValue + '.' + part, '')}`
            }
          </>
        )
      }
    }
    return schema
  }

  const schema: TableCellRenderer = props => (
    <TableCell title={payload?.schema} key="payloads" align="center" {...props}>
      <Typography fontFamily="monospace" variant="body2" noWrap>
        {clickableFields?.includes('schema')
          ? (
              <Link sx={{ cursor: 'pointer' }}>{reduceSchemaDepth(payload?.schema, maxSchemaDepth)}</Link>
            )
          : reduceSchemaDepth(payload?.schema, maxSchemaDepth)}

      </Typography>
    </TableCell>
  )

  const valid: TableCellRenderer = props => (
    <TableCell key="valid" align="center" {...props}>
      {isValid === undefined && payload != undefined
        ? <WarningAmberRoundedIcon fontSize="small" color="warning" />
        : isValid === true
          ? <CheckCircleOutlineRoundedIcon fontSize="small" color="success" />
          : isValid === false
            ? <ErrorOutlineRoundedIcon color="error" fontSize="small" />
          // to keep row height consistent when no data provided, may need fix later
            : <ErrorOutlineRoundedIcon sx={{ color: alpha('#fff', 0) }} fontSize="small" />}
    </TableCell>
  )

  const tableCells: Record<PayloadTableColumnSlug, TableCellRenderer> = {
    hash,
    schema,
    valid,
  }

  const columnsMemo = useMemo(() => columns ?? payloadTableColumnConfigDefaults(), [columns])

  return isDefined(breakPoint)
    ? (
        <TableRow style={{ maxWidth: '100vw' }} {...props}>
          {columnsMemo[breakPoint]?.map((column) => {
            return tableCells[column]({})
          })}
        </TableRow>
      )
    : null
}
