import { TableCell, TableRow, TableRowProps, Typography } from '@mui/material'
import { useBreakpoint } from '@xylabs/sdk-react'
import { XyoPayload, XyoPayloadWrapper } from '@xyo-network/sdk-xyo-client-js'
import { DateTime } from 'luxon'
import { ReactElement } from 'react'
import { MdClear, MdDone } from 'react-icons/md'

import { HashTableCell } from '../../HashTableCell'
import {
  PayloadTableColumnConfig,
  payloadTableColumnConfigDefaults,
  PayloadTableColumnSlug,
} from './PayloadTableColumnConfig'

export interface PayloadTableRowProps extends TableRowProps {
  payload?: XyoPayload
  exploreDomain?: string
  columns?: PayloadTableColumnConfig
}

export const PayloadTableRow: React.FC<PayloadTableRowProps> = ({
  exploreDomain,
  payload,
  columns = payloadTableColumnConfigDefaults(),
  ...props
}) => {
  const breakPoint = useBreakpoint()
  const timeStamp = payload?._timestamp ? DateTime.fromMillis(payload?._timestamp) : undefined
  const wrapper = payload ? new XyoPayloadWrapper(payload) : undefined

  const tableCells: Record<PayloadTableColumnSlug, ReactElement> = {
    archive: (
      <TableCell key="archive" align="center">
        <Typography variant="body2" noWrap>
          {payload?._archive}
        </Typography>
      </TableCell>
    ),
    client: (
      <TableCell key="client" align="center">
        <Typography variant="body2" noWrap>
          {payload?._client}
        </Typography>
      </TableCell>
    ),
    date: (
      <TableCell key="date" align="center">
        <Typography variant="body2" noWrap>
          {timeStamp?.toLocaleString(DateTime.DATE_SHORT)}
        </Typography>
      </TableCell>
    ),
    hash: (
      <HashTableCell
        key="hash"
        hash={payload?._hash}
        archive={payload?._archive}
        dataType="payload"
        exploreDomain={exploreDomain}
      />
    ),
    schema: (
      <TableCell key="payloads" align="center">
        <Typography variant="body2" noWrap>
          {payload?.schema}
        </Typography>
      </TableCell>
    ),
    time: (
      <TableCell key="time" align="center">
        <Typography variant="body2" noWrap>
          {timeStamp?.toLocaleString(DateTime.TIME_SIMPLE)}
        </Typography>
      </TableCell>
    ),
    valid: (
      <TableCell key="valid" align="center">
        <Typography variant="body2" noWrap>
          {wrapper?.validator.all().length === 0 ? (
            <MdDone fontSize={18} color="green" />
          ) : (
            <MdClear color="red" fontSize={18} />
          )}
        </Typography>
      </TableCell>
    ),
  }

  return breakPoint ? (
    <TableRow style={{ maxWidth: '100vw' }} {...props}>
      {columns[breakPoint]?.map((column) => {
        return tableCells[column]
      })}
    </TableRow>
  ) : null
}
