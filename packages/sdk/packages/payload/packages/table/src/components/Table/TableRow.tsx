import {
  CheckCircleOutlineRounded as CheckCircleOutlineRoundedIcon,
  ErrorOutlineRounded as ErrorOutlineRoundedIcon,
  WarningAmberRounded as WarningAmberRoundedIcon,
} from '@mui/icons-material'
import { alpha, TableCell, TableCellProps, TableRow, TableRowProps, Typography } from '@mui/material'
import { Hash } from '@xylabs/hex'
import { usePromise } from '@xylabs/react-promise'
import { useBreakpoint } from '@xylabs/react-shared'
import { Payload } from '@xyo-network/payload-model'
import { PayloadValidator } from '@xyo-network/payload-validator'
import { useNetwork } from '@xyo-network/react-network'
import { HashTableCell, usePayloadHash } from '@xyo-network/react-shared'
import React from 'react'

import { PayloadTableColumnConfig, payloadTableColumnConfigDefaults, PayloadTableColumnSlug } from './PayloadTableColumnConfig.js'

export interface PayloadTableRowProps extends TableRowProps {
  archive?: string
  columns?: PayloadTableColumnConfig
  exploreDomain?: string
  maxSchemaDepth?: number
  network?: string
  onHashClick?: (value: Hash) => void
  payload?: Payload
}

export const PayloadTableRow: React.FC<PayloadTableRowProps> = ({
  archive,
  columns = payloadTableColumnConfigDefaults(),
  exploreDomain,
  maxSchemaDepth,
  network: networkProp,
  onHashClick,
  payload,
  ...props
}) => {
  const breakPoint = useBreakpoint()
  const payloadHash = usePayloadHash(payload)
  const { network } = useNetwork()
  const [errors = []] = usePromise(async () => (payload ? await new PayloadValidator(payload).validate() : undefined), [payload])
  const isValid = errors.length === 0

  const hash: React.FC<TableCellProps> = props => (
    <HashTableCell
      key="hash"
      archive={archive}
      width="100%"
      value={payloadHash}
      onHashClick={onHashClick}
      dataType="payload"
      exploreDomain={exploreDomain}
      network={networkProp ?? network?.slug}
      {...props}
    />
  )

  const reduceSchemaDepth = (schema?: string, maxSchemaDepth?: number) => {
    if (maxSchemaDepth) {
      const parts = schema?.split('.') ?? []
      const partsToRemove = parts.length - maxSchemaDepth > 0 ? parts.length - maxSchemaDepth : 0
      if (partsToRemove > 0) {
        return (
          <>
            <>&#x2026;</>
            {
              // eslint-disable-next-line unicorn/no-array-reduce
              `${parts.slice(partsToRemove).reduce((previousValue, part) => `${previousValue}.${part}`)}`
            }
          </>
        )
      }
    }
    return schema
  }

  const schema: React.FC<TableCellProps> = props => (
    <TableCell title={payload?.schema} key="payloads" align="center" {...props}>
      <Typography fontFamily="monospace" variant="body2" noWrap>
        {reduceSchemaDepth(payload?.schema, maxSchemaDepth)}
      </Typography>
    </TableCell>
  )

  const valid: React.FC<TableCellProps> = props => (
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

  const tableCells: Record<PayloadTableColumnSlug, React.FC<TableCellProps>> = {
    hash,
    schema,
    valid,
  }

  return breakPoint
    ? (
        <TableRow style={{ maxWidth: '100vw' }} {...props}>
          {columns[breakPoint]?.map((column) => {
            return tableCells[column]({})
          })}
        </TableRow>
      )
    : null
}
