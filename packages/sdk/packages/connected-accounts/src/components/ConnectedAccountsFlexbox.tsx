import { Typography, useTheme } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'

import { useDetectedWallets } from '../hooks'
import { ConnectedWalletsTable } from './wallet'

export const ConnectedAccountsFlexbox: React.FC<FlexBoxProps> = (props) => {
  const theme = useTheme()

  const { totalConnectedAccounts, sortedWallets } = useDetectedWallets()

  return (
    <FlexCol alignItems="stretch" justifyContent="start" gap={2} {...props}>
      <FlexCol alignItems="start">
        <Typography variant={'h2'} sx={{ mb: 0.5 }}>
          Detected Web3 Wallets
        </Typography>
        {totalConnectedAccounts ? (
          <Typography variant={'subtitle1'} color={theme.palette.secondary.main} sx={{ opacity: 0.5 }}>
            Total Connected Accounts: {totalConnectedAccounts}
          </Typography>
        ) : null}
      </FlexCol>
      <ConnectedWalletsTable wallets={sortedWallets} />
    </FlexCol>
  )
}
