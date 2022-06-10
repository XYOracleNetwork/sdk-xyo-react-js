import { WithChildren } from '@xylabs/react-shared'
import { XyoMetaMaskConnector } from '@xyo-network/utils'
import { useEffect, useState } from 'react'

export interface CheckForMetaMaskProps {
  metaMaskWallet: XyoMetaMaskConnector
}

export const CheckForMetaMask: React.FC<WithChildren<CheckForMetaMaskProps>> = ({ children, metaMaskWallet }) => {
  const [missingMetaMask, setMissingMetaMask] = useState(false)

  useEffect(() => {
    if (!metaMaskWallet.isMetaMaskInstalled()) {
      setMissingMetaMask(true)
    } else {
      if (!metaMaskWallet.currentAccount) {
        metaMaskWallet.isWalletIsConnected()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{missingMetaMask ? <p>Please install MetaMask and reload the app.</p> : children}</>
}
