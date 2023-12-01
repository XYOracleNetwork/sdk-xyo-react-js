import { Check } from '@mui/icons-material'
import { Button, TableCell, TableCellProps, Typography } from '@mui/material'
import { FlexRow } from '@xylabs/react-flexbox'

export interface ConnectedWalletsActionsTableCellProps extends TableCellProps {
  connected?: boolean
  onRevoke?: () => void
}

export const ConnectedWalletsActionsTableCell: React.FC<ConnectedWalletsActionsTableCellProps> = ({ connected, onRevoke, ...props }) => {
  return (
    <TableCell {...props}>
      <FlexRow gap={2} justifyContent="start">
        {connected ? (
          <Typography sx={{ display: 'inline-flex', gap: 0.5 }}>
            <Check />
            Connected
          </Typography>
        ) : (
          <Button variant={'contained'}>Connect</Button>
        )}
        {connected ? (
          <Button variant={'outlined'} color={'error'} onClick={onRevoke}>
            Revoke
          </Button>
        ) : null}
      </FlexRow>
    </TableCell>
  )
}
