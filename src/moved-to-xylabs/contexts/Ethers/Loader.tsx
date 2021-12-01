/* eslint-disable @delagen/deprecation/deprecation */
import { InfuraEthersLoader } from './Infura'
import { MetaMaskEthersLoader } from './MetaMask'
import { MyEtherWalletEthersLoader } from './MyEtherWallet'
import { OperaEthersLoader } from './Opera'
import { TrustEthersLoader } from './Trust'

interface Props {
  enabled?: boolean
}

/** @deprecated Moved to @xylabs/sdk-react */
export const EthersLoader: React.FC<Props> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const global = window as any
  const { children } = props

  if (global.ethereum?.isMetaMask) {
    return <MetaMaskEthersLoader>{children}</MetaMaskEthersLoader>
  }

  if (global.ethereum?.isTrust) {
    return <TrustEthersLoader>{children}</TrustEthersLoader>
  }

  if (global.ethereum?.isMew) {
    return <MyEtherWalletEthersLoader>{children}</MyEtherWalletEthersLoader>
  }

  if (global.ethereum?.providerName === 'opera') {
    return <OperaEthersLoader>{children}</OperaEthersLoader>
  }

  if (global.ethereum) {
    return <OperaEthersLoader>{children}</OperaEthersLoader>
  }

  return <InfuraEthersLoader>{children}</InfuraEthersLoader>
}
