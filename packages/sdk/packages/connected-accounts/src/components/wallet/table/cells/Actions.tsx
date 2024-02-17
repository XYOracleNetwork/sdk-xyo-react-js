import { Check, InfoOutlined } from '@mui/icons-material'
import { Button, IconButton, TableCell, Typography } from '@mui/material'
import { FlexRow } from '@xylabs/react-flexbox'

import { ConnectedWalletTableCellProps } from './lib'

export const ConnectedWalletsActionsTableCell: React.FC<ConnectedWalletTableCellProps> = ({ connected, onConnect, onRevoke, tableCellProps }) => {
  return (
    <TableCell {...tableCellProps}>
      <FlexRow gap={2} justifyContent="start">
        {connected ?
          <Typography sx={{ display: 'inline-flex', gap: 0.5 }}>
            <Check />
            Connected
          </Typography>
        : <Button variant={'contained'} onClick={onConnect}>
            Connect
          </Button>
        }
        {connected ?
          <IconButton onClick={onRevoke}>
            <InfoOutlined />
          </IconButton>
        : null}
      </FlexRow>
    </TableCell>
  )
}
