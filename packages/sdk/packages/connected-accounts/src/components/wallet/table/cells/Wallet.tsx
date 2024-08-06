import { TableCell, useTheme } from '@mui/material'
import { ConstrainedImage } from '@xylabs/react-crypto'
import { FlexRow } from '@xylabs/react-flexbox'
import React from 'react'

import { ConnectedWalletTableCellProps } from './lib/index.ts'

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
