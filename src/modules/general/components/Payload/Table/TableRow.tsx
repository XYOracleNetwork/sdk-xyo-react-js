import { TableCell, TableRow, TableRowProps, Typography } from '@mui/material'
import { useBreakpoint } from '@xylabs/sdk-react'
import { XyoPayload, XyoPayloadWrapper } from '@xyo-network/sdk-xyo-client-js'
import { DateTime } from 'luxon'
import { ReactElement } from 'react'
import { MdClear, MdDone } from 'react-icons/md'

import { HashTableCell } from '../../TableCell'
import { PayloadTableColumnConfig, payloadTableColumnConfigDefaults, PayloadTableColumnSlug } from './PayloadTableColumnConfig'

export interface PayloadTableRowProps extends TableRowProps {
  payload?: XyoPayload
  exploreDomain?: string
  columns?: PayloadTableColumnConfig
}

export const PayloadTableRow: React.FC<PayloadTableRowProps> = ({ exploreDomain, payload, columns = payloadTableColumnConfigDefaults(), ...props }) => {
  const breakPoint = useBreakpoint()
  const timeStamp = payload?._timestamp ? DateTime.fromMillis(payload?._timestamp) : undefined
  const wrapper = payload ? new XyoPayloadWrapper(payload) : undefined

  const archive = (
    <TableCell key="archive" align="center">
      <Typography fontFamily="monospace" variant="body2" noWrap>
        {payload?._archive}
      </Typography>
    </TableCell>
  )

  const client = (
    <TableCell key="client" align="center">
      <Typography fontFamily="monospace" variant="body2" noWrap>
        {payload?._client}
      </Typography>
    </TableCell>
  )

  const date = (
    <TableCell key="date" align="center">
      <Typography fontFamily="monospace" variant="body2" noWrap>
        {timeStamp?.toLocaleString(DateTime.DATE_SHORT)}
      </Typography>
    </TableCell>
  )

  const hash = <HashTableCell key="hash" value={payload?._hash} archive={payload?._archive} dataType="payload" exploreDomain={exploreDomain} />

  const schema = (
    <TableCell key="payloads" align="center">
      <Typography fontFamily="monospace" variant="body2" noWrap>
        {payload?.schema}
      </Typography>
    </TableCell>
  )

  const time = (
    <TableCell key="time" align="center">
      <Typography fontFamily="monospace" variant="body2" noWrap>
        {timeStamp?.toLocaleString(DateTime.TIME_SIMPLE)}
      </Typography>
    </TableCell>
  )

  const valid = (
    <TableCell key="valid" align="center">
      <Typography fontFamily="monospace" variant="body2" noWrap>
        {wrapper?.validator.all().length === 0 ? <MdDone fontSize={18} color="green" /> : <MdClear color="red" fontSize={18} />}
      </Typography>
    </TableCell>
  )

  const tableCells: Record<PayloadTableColumnSlug, ReactElement> = {
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
        return tableCells[column]
      })}
    </TableRow>
  ) : null
}
