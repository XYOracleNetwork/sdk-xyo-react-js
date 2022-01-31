import { ButtonEx } from '@xylabs/sdk-react'
import { XyoMetaMaskConnector } from '@xyo-network/sdk-xyo-client-js'
import { Dispatch, SetStateAction } from 'react'

import { AuthAction, AuthActionTypes } from '../../../contexts'
import { MetaMaskSVG } from './MetaMaskSVG'
import { Web3ProviderIcon } from './Web3ProviderIcon'

interface ConnectWalletProps {
  setCheckedWallet: Dispatch<SetStateAction<boolean>>
  authDispatch: Dispatch<AuthAction>
  MetaMaskService: XyoMetaMaskConnector
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ setCheckedWallet, authDispatch, MetaMaskService }) => {
  const connectWallet = async () => {
    if (!MetaMaskService.currentAccount) {
      try {
        await MetaMaskService.connectWallet()
        setCheckedWallet(true)
      } catch (err) {
        authDispatch({ payload: { authError: err as Error }, type: AuthActionTypes.UpdateAuthError })
      }
    } else {
      setCheckedWallet(true)
    }
  }

  return (
    <ButtonEx size="large" variant="outlined" onClick={connectWallet}>
      <Web3ProviderIcon>
        <MetaMaskSVG />
      </Web3ProviderIcon>
      Login with MetaMask
    </ButtonEx>
  )
}

export { ConnectWallet }
