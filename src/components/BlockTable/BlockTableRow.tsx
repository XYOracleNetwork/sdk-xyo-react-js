import { Link, TableCell, TableRow, TableRowProps } from '@mui/material'
import { XyoBoundWitness, XyoBoundWitnessWrapper } from '@xyo-network/sdk-xyo-client-js'
import compact from 'lodash/compact'
import { DateTime } from 'luxon'
import { MdClear, MdDone } from 'react-icons/md'

export interface BlockTableRowProps extends TableRowProps {
  archive?: string
  block?: XyoBoundWitness
  exploreDomain?: string
}

export const BlockTableRow: React.FC<BlockTableRowProps> = ({
  exploreDomain = 'https://beta.explore.xyo.network',
  archive = 'temp',
  block,
  ...props
}) => {
  const timeStamp = block?._timestamp ? DateTime.fromMillis(block?._timestamp) : undefined
  const wrapper = block ? new XyoBoundWitnessWrapper(block) : undefined
  return (
    <TableRow {...props}>
      <TableCell>
        <Link target="_blank" href={`${exploreDomain}/archive/${archive}/block/hash/${block?._hash}`}>
          {block?._hash}
        </Link>
      </TableCell>
      <TableCell align="center">{block?._archive}</TableCell>
      <TableCell align="center">{block?._client}</TableCell>
      <TableCell align="center">{timeStamp?.toLocaleString(DateTime.DATE_SHORT)}</TableCell>
      <TableCell align="center">{timeStamp?.toLocaleString(DateTime.TIME_SIMPLE)}</TableCell>
      <TableCell align="center">
        {compact(block?.payload_hashes ?? []).length}|{compact(block?.addresses ?? []).length}|
        {compact(block?.previous_hashes ?? [])?.length}
      </TableCell>
      <TableCell align="center">
        {wrapper?.validator.all().length === 0 ? (
          <MdDone fontSize={18} color="green" />
        ) : (
          <MdClear color="red" fontSize={18} />
        )}
      </TableCell>
    </TableRow>
  )
}
