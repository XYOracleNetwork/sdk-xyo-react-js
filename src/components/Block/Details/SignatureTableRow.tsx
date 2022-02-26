import { TableCell, TableRow, TableRowProps, Typography } from '@mui/material'
import { ellipsize } from '@xylabs/sdk-js'

import { AddressTableCell } from '../../TableCell'

export interface BlockSignatureTableRowProps extends TableRowProps {
  address?: string
  previousHash?: string | null
  signature?: string
}

export const BlockSignatureTableRow: React.FC<BlockSignatureTableRowProps> = ({
  address,
  previousHash,
  signature,
  ...props
}) => {
  return (
    <TableRow {...props}>
      <AddressTableCell value={address} />
      <TableCell sx={{ display: { lg: 'table-cell', xs: 'none' } }} align="center">
        <Typography variant="body2" fontFamily="monospace">
          {previousHash ? ellipsize(previousHash, 8) : '-'}
        </Typography>
      </TableCell>
      <TableCell sx={{ display: { sm: 'table-cell', xs: 'none' } }} align="center">
        <Typography variant="body2" fontFamily="monospace">
          {signature ? ellipsize(signature, 8) : '-'}
        </Typography>
      </TableCell>
    </TableRow>
  )
}
