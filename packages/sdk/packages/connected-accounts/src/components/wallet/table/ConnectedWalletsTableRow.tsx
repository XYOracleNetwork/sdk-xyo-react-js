import { RadioButtonChecked, RadioButtonUnchecked } from '@mui/icons-material'
import { TableCell, TableRow, TableRowProps, useTheme } from '@mui/material'
import { ConstrainedImage } from '@xylabs/react-crypto'

export interface WalletConnectionsTableRowProps extends TableRowProps {
  approvedAccounts?: string[]
  icon?: string
  name?: string
}

export const WalletConnectionsTableRow: React.FC<WalletConnectionsTableRowProps> = ({ approvedAccounts, icon, name, ...props }) => {
  const theme = useTheme()

  const accountToDisplay = approvedAccounts?.length ? approvedAccounts[0] : null
  return (
    <TableRow {...props}>
      <TableCell>{accountToDisplay ? <RadioButtonChecked color={'success'} /> : <RadioButtonUnchecked />}</TableCell>
      <TableCell>
        <ConstrainedImage constrainedValue={theme.spacing(2)} src={icon} />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{accountToDisplay ?? 'none'}</TableCell>
    </TableRow>
  )
}
