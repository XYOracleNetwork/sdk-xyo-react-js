import { TableCell, TableCellProps, Tooltip, Typography } from '@mui/material'

export interface ConnectedWalletsAccountsTableCellProps extends TableCellProps {
  additionalAccounts?: string[]
  currentAccount?: string[]
  totalAccounts: number
}

export const ConnectedWalletsAccountsTableCell: React.FC<ConnectedWalletsAccountsTableCellProps> = ({
  additionalAccounts,
  currentAccount,
  totalAccounts,
  ...props
}) => {
  return (
    <TableCell {...props}>
      <Tooltip
        sx={{ cursor: totalAccounts > 0 ? 'pointer' : 'auto' }}
        title={[...(currentAccount ?? []), ...(additionalAccounts ?? [])].map((address, index) => (
          <p key={index}>{address}</p>
        ))}
      >
        <Typography>{totalAccounts}</Typography>
      </Tooltip>
    </TableCell>
  )
}
