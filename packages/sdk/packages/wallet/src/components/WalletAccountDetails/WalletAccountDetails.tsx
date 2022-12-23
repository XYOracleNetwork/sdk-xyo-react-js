import { EthAddress } from '@xylabs/eth-address'
import { EthAccountButton } from '@xylabs/react-crypto'
import { FlexBoxProps, FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { NumberStatus } from '@xylabs/react-number-status'
import { Account } from '@xyo-network/account'
import { useNetwork } from '@xyo-network/react-network'

import { useAccount } from '../../contexts'

export interface WalletAccountDetailsProps extends FlexBoxProps {
  account?: Account
  exploreUrl?: string
}

export const WalletAccountDetails: React.FC<WalletAccountDetailsProps> = ({
  exploreUrl = 'https://explore.xyo.network',
  account: accountProp,
  ...props
}) => {
  const { account = accountProp } = useAccount()
  const { network } = useNetwork()
  const exploreAddressUrl = `${exploreUrl}/recent?account=${account?.addressValue.hex}&network=${network?.name ?? 'main'}`

  return (
    <FlexCol {...props}>
      <EthAccountButton address={EthAddress.fromString(account?.addressValue.hex)} />
      <FlexRow gap={1}>
        <NumberStatus rounded title="Tokens" value={0} to={`${exploreAddressUrl}&schema=network.xyo.account.tokens`} target="_blank" />
        <NumberStatus rounded title="NFTs" value={0} to={`${exploreAddressUrl}&schema=network.xyo.account.nfts`} target="_blank" />
        <NumberStatus rounded title="Signatures" value={0} to={`${exploreAddressUrl}&schema=network.xyo.account.signatures`} target="_blank" />
        <NumberStatus rounded title="Signins" value={0} to={`${exploreAddressUrl}&schema=network.xyo.account.signins`} target="_blank" />
      </FlexRow>
    </FlexCol>
  )
}
