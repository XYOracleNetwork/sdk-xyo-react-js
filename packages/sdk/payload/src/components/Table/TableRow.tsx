import { TableCell, TableCellProps, TableRow, TableRowProps, Typography } from '@mui/material'
import { useBreakpoint } from '@xylabs/react-shared'
import { XyoPayloadWithMeta, XyoPayloadWithPartialMeta, XyoPayloadWrapper, XyoPayloadWrapperValidator } from '@xyo-network/payload'
import { useNetwork } from '@xyo-network/react-network'
import { HashTableCell } from '@xyo-network/react-shared'
import { DateTime } from 'luxon'
import { MdClear, MdDone } from 'react-icons/md'

import { PayloadTableColumnConfig, payloadTableColumnConfigDefaults, PayloadTableColumnSlug } from './PayloadTableColumnConfig'

export interface PayloadTableRowProps extends TableRowProps {
  payload?: XyoPayloadWithPartialMeta
  exploreDomain?: string
  columns?: PayloadTableColumnConfig
  network?: string
}

export const PayloadTableRow: React.FC<PayloadTableRowProps> = ({
  exploreDomain,
  network: networkProp,
  payload,
  columns = payloadTableColumnConfigDefaults(),
  ...props
}) => {
  const breakPoint = useBreakpoint()
  const timeStamp = payload?._timestamp ? DateTime.fromMillis(payload?._timestamp) : undefined
  const wrapper = payload ? new XyoPayloadWrapper(payload) : undefined
  const { network } = useNetwork()

  const archive: React.FC<TableCellProps> = (props) => (
    <TableCell key="archive" align="center" {...props}>
      <Typography fontFamily="monospace" variant="body2" noWrap>
        {payload?._archive}
      </Typography>
    </TableCell>
  )

  const client: React.FC<TableCellProps> = (props) => (
    <TableCell key="client" align="center" {...props}>
      <Typography fontFamily="monospace" variant="body2" noWrap>
        {payload?._client}
      </Typography>
    </TableCell>
  )

  const date: React.FC<TableCellProps> = (props) => (
    <TableCell key="date" align="center" {...props}>
      <Typography fontFamily="monospace" variant="body2" noWrap>
        {timeStamp?.toLocaleString(DateTime.DATE_SHORT)}
      </Typography>
    </TableCell>
  )

  const hash: React.FC<TableCellProps> = (props) => (
    <HashTableCell
      key="hash"
      width="100%"
      value={payload?._hash}
      archive={payload?._archive}
      dataType="payload"
      exploreDomain={exploreDomain}
      network={networkProp ?? network?.slug}
      {...props}
    />
  )

  const schema: React.FC<TableCellProps> = (props) => (
    <TableCell key="payloads" align="center" {...props}>
      <Typography fontFamily="monospace" variant="body2" noWrap>
        {payload?.schema}
      </Typography>
    </TableCell>
  )

  const time: React.FC<TableCellProps> = (props) => (
    <TableCell key="time" align="center" {...props}>
      <Typography fontFamily="monospace" variant="body2" noWrap>
        {timeStamp?.toLocaleString(DateTime.TIME_SIMPLE)}
      </Typography>
    </TableCell>
  )

  const isValid = wrapper ? new XyoPayloadWrapperValidator(wrapper as XyoPayloadWrapper<XyoPayloadWithMeta>).validate().length === 0 : undefined

  const valid: React.FC<TableCellProps> = (props) => (
    <TableCell key="valid" align="center" {...props}>
      <Typography fontFamily="monospace" variant="body2" noWrap>
        {isValid === undefined ? (
          <MdDone fontSize={18} color="yellow" />
        ) : isValid ? (
          <MdDone fontSize={18} color="green" />
        ) : (
          <MdClear color="red" fontSize={18} />
        )}
      </Typography>
    </TableCell>
  )

  const tableCells: Record<PayloadTableColumnSlug, React.FC<TableCellProps>> = {
    archive,
    client,
    date,
    hash,
    schema,
    time,
    valid,
  }

  return breakPoint ? (
    <TableRow style={{ maxWidth: '100vw' }} {...props}>
      {columns[breakPoint]?.map((column) => {
        return tableCells[column]({})
      })}
    </TableRow>
  ) : null
}
