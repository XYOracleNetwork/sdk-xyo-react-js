import { ButtonEx } from '@xylabs/sdk-react'
import { XyoMetaMaskConnector } from '@xyo-network/sdk-xyo-client-js'
import { Dispatch, SetStateAction } from 'react'

import { MetaMaskSVG } from './MetaMaskSVG'
import { MetaMaskError } from './Web3Login'
import { Web3ProviderIcon } from './Web3ProviderIcon'

interface ConnectWalletProps {
  setCheckedWallet: Dispatch<SetStateAction<boolean>>
  MetaMaskService: XyoMetaMaskConnector
  isLoading: boolean
  setMetaMaskError: Dispatch<SetStateAction<MetaMaskError | undefined>>
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({
  setCheckedWallet,
  MetaMaskService,
  isLoading,
  setMetaMaskError,
}) => {
  const connectWallet = async () => {
    if (!MetaMaskService.currentAccount) {
      try {
        await MetaMaskService.connectWallet()
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
