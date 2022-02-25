import { Link, TableCell, TableRow, TableRowProps } from '@mui/material'
import { ellipsize } from '@xylabs/sdk-js'
import { LinkEx } from '@xylabs/sdk-react'
import { XyoPayload, XyoPayloadWrapper } from '@xyo-network/sdk-xyo-client-js'
import { DateTime } from 'luxon'
import { MdClear, MdDone } from 'react-icons/md'

export interface PayloadTableRowProps extends TableRowProps {
  payload?: XyoPayload
  exploreDomain?: string
  validate?: boolean
  showClient?: boolean
}

export const PayloadTableRow: React.FC<PayloadTableRowProps> = ({
  exploreDomain,
  showClient = false,
  payload,
  validate,
  ...props
}) => {
  const timeStamp = payload?._timestamp ? DateTime.fromMillis(payload?._timestamp) : undefined
  const wrapper = payload ? new XyoPayloadWrapper(payload) : undefined
  return (
    <TableRow {...props}>
      <TableCell>
        {exploreDomain ? (
          <Link target="_blank" href={`${exploreDomain}/archive/${payload?._archive}/payload/hash/${payload?._hash}`}>
            {ellipsize(payload?._hash || '', 4)}
          </Link>
        ) : (
          <LinkEx to={`/archive/${payload?._archive}/payload/hash/${payload?._hash}`}>
            {ellipsize(payload?._hash || '', 12)}
          </LinkEx>
        )}
      </TableCell>
      <TableCell align="center">{payload?._archive}</TableCell>
      {showClient ? <TableCell align="center">{payload?._client}</TableCell> : null}
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
