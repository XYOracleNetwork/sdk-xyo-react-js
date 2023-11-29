import { Button, Typography } from '@mui/material'
import { useWalletDiscovery } from '@xylabs/react-crypto'
import { FlexBoxProps, FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { useMemo } from 'react'

import { ConnectedWalletsTable } from './wallet'
export const ConnectedAccountsFlexbox: React.FC<FlexBoxProps> = (props) => {
  const wallets = useWalletDiscovery()
  const totalConnectedAccounts = useMemo(
    () => Object.values(wallets ?? {}).reduce((acc, wallet) => acc + wallet.allowedAccounts.length, 0),
    [wallets],
  )
  return (
    <FlexCol alignItems="start" justifyContent="start" gap={2} {...props}>
      <FlexRow justifyContent="space-between">
        <Button disabled variant="contained">
          Connect Wallet
        </Button>
        <FlexCol>
          <Typography fontSize="52px">{totalConnectedAccounts}</Typography>
          <Typography variant="overline">Connected {totalConnectedAccounts === 1 ? 'Account' : 'Accounts'}</Typography>
        </FlexCol>
      </FlexRow>
      <Typography variant={'h2'}>Web3 Wallets</Typography>
      <ConnectedWalletsTable wallets={wallets} />
    </FlexCol>
  )
}
