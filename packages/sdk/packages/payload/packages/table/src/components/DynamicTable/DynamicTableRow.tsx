import {
  CheckCircleOutlineRounded as CheckCircleOutlineRoundedIcon,
  ErrorOutlineRounded as ErrorOutlineRoundedIcon,
  WarningAmberRounded as WarningAmberRoundedIcon,
} from '@mui/icons-material'
import type {
  AvatarProps, TableCellProps, TableRowProps,
} from '@mui/material'
import {
  TableCell, TableRow, Typography,
} from '@mui/material'
import { usePromise } from '@xylabs/react-promise'
import { useBreakpoint } from '@xylabs/react-shared'
import { PayloadBuilder } from '@xyo-network/payload-builder'
import type { Payload } from '@xyo-network/payload-model'
import { PayloadValidator } from '@xyo-network/payload-validator'
import { useNetwork } from '@xyo-network/react-network'
import type { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { usePayloadRenderPluginResolver } from '@xyo-network/react-payload-plugin-resolver'
import { HashTableCell, usePayloadHash } from '@xyo-network/react-shared'
import type { ComponentType } from 'react'
import React, { useMemo } from 'react'

import type { TableCellRenderer } from '../lib/index.ts'
import type {
  PayloadDynamicTableColumnConfig,
  PayloadDynamicTableColumnSlug,
} from './PayloadDynamicTableColumnConfig.ts'
import { payloadDynamicTableColumnConfigDefaults } from './PayloadDynamicTableColumnConfig.ts'

export interface PayloadDynamicTableRowProps extends TableRowProps {
  /** @deprecated - archives are no longer used */
  archive?: string
  columns?: PayloadDynamicTableColumnConfig
  /** @deprecated - use event listeners instead of link building via props */
  exploreDomain?: string
  network?: string
  payload?: Payload & { sources?: string[] }
}

export const PayloadDynamicTableRow: React.FC<PayloadDynamicTableRowProps> = ({
  columns,
  network: networkProp,
  payload,
  ...props
}) => {
  const breakPoint = useBreakpoint()
  const payloadHash = usePayloadHash(payload)
  const { network } = useNetwork()
  const { resolver } = usePayloadRenderPluginResolver()
  const [validationErrors = []] = usePromise(async () => (payload ? await new PayloadValidator(payload).validate() : undefined), [payload])
  const isValid = validationErrors.length === 0
  const payloadFieldCount = payload ? Object.keys(PayloadBuilder.hashableFields(payload)).length : 0

  const hash: TableCellRenderer = props => (
    <HashTableCell
      key="hash"
      align="left"
      value={payloadHash}
      dataType="payload"
      network={networkProp ?? network?.slug}
      {...props}
    />
  )

  const schema: TableCellRenderer = props => (
    <TableCell key="payloads" align="left" {...props}>
      <Typography fontFamily="monospace" variant="body2" noWrap>
        {payload?.schema}
      </Typography>
    </TableCell>
  )

  const details: TableCellRenderer = props => (
    <TableCell key="payloads" align="left" {...props}>
      <Typography fontFamily="monospace" variant="body2" noWrap>
        {payloadFieldCount}
      </Typography>
    </TableCell>
  )

  const render: TableCellRenderer = (props) => {
    const Render: ComponentType<PayloadRenderProps & TableCellProps> | undefined
      = payload ? resolver?.resolve(payload)?.components.table.cell : undefined
    return Render ? <Render payload={payload} {...props} /> : <TableCell key="payloads" align="left" {...props}></TableCell>
  }

  const icon: TableCellRenderer = (props) => {
    const Avatar: ComponentType<PayloadRenderProps & AvatarProps> | undefined
      = payload ? resolver?.resolve(payload)?.components.avatar.image : undefined

    return (
      <TableCell key="payloads" align="left" {...props}>
        {Avatar
          ? <Avatar payload={payload} />
          : null}
      </TableCell>
    )
  }

  const valid: TableCellRenderer = props => (
    <TableCell key="valid" align="center" {...props}>
      {isValid === undefined && payload != undefined
        ? <WarningAmberRoundedIcon fontSize="small" color="warning" />
        : isValid === true
          ? <CheckCircleOutlineRoundedIcon fontSize="small" color="success" />
          : isValid === false
            ? <ErrorOutlineRoundedIcon color="error" fontSize="small" />
          // nbsp to keep row height consistent even when no data is provided for the row
            : <Typography> &nbsp;</Typography>}
    </TableCell>
  )

  const tableCells: Record<PayloadDynamicTableColumnSlug, TableCellRenderer> = {
    details,
    hash,
    icon,
    render,
    schema,
    valid,
  }

  const columnsMemo = useMemo(() => columns ?? payloadDynamicTableColumnConfigDefaults(), [columns])

  return breakPoint
    ? (
        <TableRow style={{ maxWidth: '100vw' }} {...props}>
          {columnsMemo[breakPoint]?.map((column) => {
            return column.slug ? tableCells[column.slug]({}) : null
          })}
        </TableRow>
      )
    : null
}
