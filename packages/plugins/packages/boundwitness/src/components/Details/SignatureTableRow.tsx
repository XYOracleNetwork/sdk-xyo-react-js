import { TableCell, TableRow, TableRowProps, Typography } from '@mui/material'
import { ellipsize } from '@xylabs/sdk-js'
import { BoundWitnessValidator } from '@xyo-network/boundwitness'
import { AddressTableCell } from '@xyo-network/react-shared'
import { MdClear, MdDone } from 'react-icons/md'

export interface BoundWitnessSignatureTableRowProps extends TableRowProps {
  address?: string
  archive?: string
  hash?: string
  previousHash?: string | null
  signature?: string
}

export const BoundWitnessSignatureTableRow: React.FC<BoundWitnessSignatureTableRowProps> = ({
  hash,
  address,
  previousHash,
  signature,
  archive,
  ...props
}) => {
  const errors = hash && address ? BoundWitnessValidator.validateSignature(hash, address, signature) : []

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
        {errors.length === 0 ? <MdDone fontSize={18} color="green" /> : <MdClear color="red" fontSize={18} />}
      </TableCell>
    </TableRow>
  )
}
