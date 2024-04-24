/* eslint-disable deprecation/deprecation */
import { TableCell, TableRow, TableRowProps, Typography } from '@mui/material'
import { toUint8Array } from '@xylabs/arraybuffer'
import { ellipsize } from '@xylabs/eth-address'
import { BoundWitnessValidator } from '@xyo-network/boundwitness-validator'
import { AddressTableCell } from '@xyo-network/react-shared'
// eslint-disable-next-line import/no-internal-modules
import { MdClear, MdDone } from 'react-icons/md'

/** @deprecated use from @xyo-network/react-default-plugin instead */
export interface BlockSignatureTableRowProps extends TableRowProps {
  address?: string
  archive?: string
  hash?: string
  previousHash?: string | null
  signature?: string
}

/** @deprecated use from @xyo-network/react-default-plugin instead */
export const BlockSignatureTableRow: React.FC<BlockSignatureTableRowProps> = ({ hash, address, previousHash, signature, archive, ...props }) => {
  const errors = hash && address ? BoundWitnessValidator.validateSignature(toUint8Array(hash), toUint8Array(address), toUint8Array(signature)) : []

  return (
    <TableRow {...props}>
      <AddressTableCell archive={archive} value={address} />
      <TableCell sx={{ display: { md: 'table-cell', xs: 'none' } }} align="center">
        <Typography variant="body2" fontFamily="monospace">
          {previousHash ? ellipsize(previousHash, 8) : '-'}
        </Typography>
      </TableCell>
      <TableCell sx={{ display: { sm: 'table-cell', xs: 'none' } }} align="center">
        <Typography variant="body2" fontFamily="monospace">
          {signature ? ellipsize(signature, 8) : '-'}
        </Typography>
      </TableCell>
      <TableCell key="valid" align="center">
        {errors.length === 0 ?
          <MdDone fontSize={18} color="green" />
        : <MdClear color="red" fontSize={18} />}
      </TableCell>
    </TableRow>
  )
}
