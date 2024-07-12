import { TableCell, useTheme } from '@mui/material'
import { ConstrainedImage } from '@xylabs/react-crypto'
import { FlexRow } from '@xylabs/react-flexbox'

import { ConnectedWalletTableCellProps } from './lib/index.js'

export const ConnectedWalletsWalletTableCell: React.FC<ConnectedWalletTableCellProps> = ({ icon, walletName, tableCellProps }) => {
  const theme = useTheme()

  return (
    <TableCell {...tableCellProps}>
      <FlexRow gap={2} justifyContent="start">
        <ConstrainedImage constrainedValue={theme.spacing(4)} src={icon} />
        {walletName}
      </FlexRow>
    </TableCell>
  )
}
