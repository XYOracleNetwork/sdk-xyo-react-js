import { EthAddress } from '@xylabs/eth-address'
import { EthAccountButton } from '@xylabs/react-crypto'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { NumberStatus } from '@xylabs/react-number-status'
import { useNetwork } from '@xyo-network/react-network'
import type { WalletInstance } from '@xyo-network/wallet-model'
import React from 'react'

import { useAccount } from '../../hooks/index.ts'

export interface WalletAccountDetailsProps extends FlexBoxProps {
  account?: WalletInstance
  exploreUrl?: string
}

export const WalletAccountDetails: React.FC<WalletAccountDetailsProps> = ({
  exploreUrl = 'https://explore.xyo.network', account, ...props
}) => {
  const [accountToUse] = useAccount({ account })
  const { network } = useNetwork()
  const exploreAddressUrl = `${exploreUrl}/recent?account=${accountToUse?.address}&network=${network?.name ?? 'main'}`

  return (
    <FlexCol {...props}>
      <EthAccountButton address={EthAddress.fromString(accountToUse?.address)} />
      <FlexRow gap={1}>
        <NumberStatus rounded title="Tokens" value={0} to={`${exploreAddressUrl}&schema=network.xyo.account.tokens`} target="_blank" />
        <NumberStatus rounded title="NFTs" value={0} to={`${exploreAddressUrl}&schema=network.xyo.account.nfts`} target="_blank" />
        <NumberStatus rounded title="Signatures" value={0} to={`${exploreAddressUrl}&schema=network.xyo.account.signatures`} target="_blank" />
        <NumberStatus rounded title="Signins" value={0} to={`${exploreAddressUrl}&schema=network.xyo.account.signins`} target="_blank" />
      </FlexRow>
    </FlexCol>
  )
}
