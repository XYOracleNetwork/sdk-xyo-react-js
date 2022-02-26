import { TableCell, TableRow, TableRowProps, Typography } from '@mui/material'
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
      <TableCell>
        <Typography variant="body2" fontFamily="monospace">
          {address ? ellipsize(address, 10) : null}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="body2" fontFamily="monospace">
          {previousHash ? ellipsize(previousHash, 10) : '-'}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="body2" fontFamily="monospace">
          {signature ? ellipsize(signature, 10) : '-'}
        </Typography>
      </TableCell>
    </TableRow>
  )
}
