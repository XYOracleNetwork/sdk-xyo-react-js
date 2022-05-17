import { ButtonEx } from '@xylabs/sdk-react'
import { XyoMetaMaskConnector } from '@xyo-network/utils'
import { Dispatch, SetStateAction } from 'react'

import { MetaMaskError } from './MetaMaskError'
import { MetaMaskSVG } from './MetaMaskSVG'
import { Web3ProviderIcon } from './Web3ProviderIcon'

interface ConnectWalletProps {
  setCheckedWallet: Dispatch<SetStateAction<boolean>>
  metaMaskWallet: XyoMetaMaskConnector
  isLoading: boolean
  setMetaMaskError: Dispatch<SetStateAction<MetaMaskError | undefined>>
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ setCheckedWallet, metaMaskWallet, isLoading, setMetaMaskError }) => {
  const connectWallet = async () => {
    if (!metaMaskWallet.currentAccount) {
      try {
        await metaMaskWallet.connectWallet()
        setCheckedWallet(true)
      } catch (err) {
        setMetaMaskError(err as MetaMaskError)
      }
    } else {
      setCheckedWallet(true)
    }
  }

  return (
    <ButtonEx size="large" variant="outlined" onClick={connectWallet} disabled={isLoading}>
      <Web3ProviderIcon>
        <MetaMaskSVG />
      </Web3ProviderIcon>
      Login with MetaMask
    </ButtonEx>
  )
}

export { ConnectWallet }
