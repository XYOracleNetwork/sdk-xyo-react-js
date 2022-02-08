import { TableCell, TableRow, TableRowProps } from '@mui/material'
import { ellipsize } from '@xylabs/sdk-js'

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
      <TableCell>{address ? ellipsize(address, 2) : null}</TableCell>
      <TableCell align="center">{previousHash ? ellipsize(previousHash, 2) : '-'}</TableCell>
      <TableCell align="center">{signature ? ellipsize(signature, 2) : '-'}</TableCell>
    </TableRow>
  )
}
