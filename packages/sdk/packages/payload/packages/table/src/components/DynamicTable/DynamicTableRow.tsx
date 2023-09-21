import {
  CheckCircleOutlineRounded as CheckCircleOutlineRoundedIcon,
  ErrorOutlineRounded as ErrorOutlineRoundedIcon,
  WarningAmberRounded as WarningAmberRoundedIcon,
} from '@mui/icons-material'
import { AvatarProps, TableCell, TableCellProps, TableRow, TableRowProps, Typography } from '@mui/material'
import { usePromise } from '@xylabs/react-promise'
import { useBreakpoint } from '@xylabs/react-shared'
import { PayloadHasher } from '@xyo-network/hash'
import { Payload } from '@xyo-network/payload-model'
import { PayloadValidator } from '@xyo-network/payload-validator'
import { useNetwork } from '@xyo-network/react-network'
import { PayloadRenderProps } from '@xyo-network/react-payload-plugin'
import { usePayloadRenderPluginResolver } from '@xyo-network/react-payload-plugin-resolver'
import { HashTableCell, HashTableCellProps, usePayloadHash } from '@xyo-network/react-shared'
import { ComponentType } from 'react'

import {
  PayloadDynamicTableColumnConfig,
  payloadDynamicTableColumnConfigDefaults,
  PayloadDynamicTableColumnSlug,
} from './PayloadDynamicTableColumnConfig'

export interface PayloadDynamicTableRowProps extends TableRowProps {
  archive?: string
  columns?: PayloadDynamicTableColumnConfig
  exploreDomain?: string
  network?: string
  payload?: Payload
}

export const PayloadDynamicTableRow: React.FC<PayloadDynamicTableRowProps> = ({
  archive,
  columns = payloadDynamicTableColumnConfigDefaults(),
  exploreDomain,
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
  const payloadFieldCount = payload ? Object.keys(PayloadHasher.hashFields(payload)).length : 0
  const hash: React.FC<HashTableCellProps> = (props) => (
    <HashTableCell
      key="hash"
      align="left"
      archive={archive}
      value={payloadHash}
      dataType="payload"
      exploreDomain={exploreDomain}
      network={networkProp ?? network?.slug}
      {...props}
    />
  )

  const schema: React.FC<TableCellProps> = (props) => (
    <TableCell key="payloads" align="left" {...props}>
      <Typography fontFamily="monospace" variant="body2" noWrap>
        {payload?.schema}
      </Typography>
    </TableCell>
  )

  const details: React.FC<TableCellProps> = (props) => (
    <TableCell key="payloads" align="left" {...props}>
      <Typography fontFamily="monospace" variant="body2" noWrap>
        {payloadFieldCount}
      </Typography>
    </TableCell>
  )

  const render: React.FC<TableCellProps> = (props) => {
    const Render: ComponentType<PayloadRenderProps & TableCellProps> | undefined = payload
      ? resolver?.resolve(payload)?.components.table.cell
      : undefined
    return Render ? <Render payload={payload} {...props} /> : <TableCell key="payloads" align="left" {...props}></TableCell>
  }

  const icon: React.FC<TableCellProps> = (props) => {
    const Avatar: ComponentType<PayloadRenderProps & AvatarProps> | undefined = payload
      ? resolver?.resolve(payload)?.components.avatar.image
      : undefined

    return (
      <TableCell key="payloads" align="left" {...props}>
        {Avatar ? <Avatar payload={payload} /> : null}
      </TableCell>
    )
  }

  const valid: React.FC<TableCellProps> = (props) => (
    <TableCell key="valid" align="center" {...props}>
      {isValid === undefined && payload != undefined ? (
        <WarningAmberRoundedIcon fontSize="small" color="warning" />
      ) : isValid === true ? (
        <CheckCircleOutlineRoundedIcon fontSize="small" color="success" />
      ) : isValid === false ? (
        <ErrorOutlineRoundedIcon color="error" fontSize="small" />
      ) : (
        //nbsp to keep row height consistent even when no data is provided for the row
        <Typography> &nbsp;</Typography>
      )}
    </TableCell>
  )

  const tableCells: Record<PayloadDynamicTableColumnSlug, React.FC<TableCellProps>> = {
    details,
    hash,
    icon,
    render,
    schema,
    valid,
  }

  return breakPoint ? (
    <TableRow style={{ maxWidth: '100vw' }} {...props}>
      {columns[breakPoint]?.map((column) => {
        return column.slug ? tableCells[column.slug]({}) : null
      })}
    </TableRow>
  ) : null
}
