import { Link, TableCell, TableRow, TableRowProps } from '@mui/material'
import { XyoPayload, XyoPayloadWrapper } from '@xyo-network/sdk-xyo-client-js'
import { DateTime } from 'luxon'
import { MdClear, MdDone } from 'react-icons/md'

export interface PayloadTableRowProps extends TableRowProps {
  payload?: XyoPayload
  exploreDomain?: string
  validate?: boolean
}

export const PayloadTableRow: React.FC<PayloadTableRowProps> = ({
  exploreDomain = 'https://beta.explore.xyo.network',
  payload,
  validate,
  ...props
}) => {
  const timeStamp = payload?._timestamp ? DateTime.fromMillis(payload?._timestamp) : undefined
  const wrapper = payload ? new XyoPayloadWrapper(payload) : undefined
  return (
    <TableRow {...props}>
      <TableCell>
        <Link target="_blank" href={`${exploreDomain}/archive/${payload?._archive}/payload/hash/${payload?._hash}`}>
          {payload?._hash}
        </Link>
      </TableCell>
      <TableCell align="center">{payload?._archive}</TableCell>
      <TableCell align="center">{payload?.schema}</TableCell>
      <TableCell align="center">{timeStamp?.toLocaleString(DateTime.DATE_SHORT)}</TableCell>
      <TableCell align="center">{timeStamp?.toLocaleString(DateTime.TIME_SIMPLE)}</TableCell>
      {validate && (
        <TableCell align="center">
          {wrapper?.validator.all().length === 0 ? (
            <MdDone fontSize={18} color="green" />
          ) : (
            <MdClear color="red" fontSize={18} />
          )}
        </TableCell>
      )}
    </TableRow>
  )
}
