import { Link, TableCell, TableRow, TableRowProps } from '@mui/material'
import { LinkEx } from '@xylabs/sdk-react'
import { XyoBoundWitness, XyoBoundWitnessWrapper } from '@xyo-network/sdk-xyo-client-js'
import compact from 'lodash/compact'
import { DateTime } from 'luxon'
import { MdClear, MdDone } from 'react-icons/md'

import { PropertyValue } from '../../Properties'

export interface BlockTableRowProps extends TableRowProps {
  block?: XyoBoundWitness
  exploreDomain?: string
  validate?: boolean
  showClient?: boolean
}

export const BlockTableRow: React.FC<BlockTableRowProps> = ({
  exploreDomain,
  showClient = false,
  block,
  validate = false,
  ...props
}) => {
  const timeStamp = block?._timestamp ? DateTime.fromMillis(block?._timestamp) : undefined
  const wrapper = block ? new XyoBoundWitnessWrapper(block) : undefined
  return (
    <TableRow {...props}>
      <TableCell>
        {exploreDomain ? (
          <Link target="_blank" href={`${exploreDomain}/archive/${block?._archive}/block/hash/${block?._hash}`}>
            <PropertyValue value={block?._hash} />
          </Link>
        ) : (
          <LinkEx to={`/archive/${block?._archive}/block/hash/${block?._hash}`}>{block?._hash}</LinkEx>
        )}
      </TableCell>
      <TableCell align="center">{block?._archive}</TableCell>
      {showClient ? <TableCell align="center">{block?._client}</TableCell> : null}
      <TableCell align="center">{timeStamp?.toLocaleString(DateTime.DATE_SHORT)}</TableCell>
      <TableCell align="center">{timeStamp?.toLocaleString(DateTime.TIME_SIMPLE)}</TableCell>
      <TableCell align="center">
        {compact(block?.payload_hashes ?? []).length}|{compact(block?.addresses ?? []).length}|
        {compact(block?.previous_hashes ?? [])?.length}
      </TableCell>
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
