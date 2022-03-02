import { useEffect, useState } from 'react'

import { XyoMetaMaskConnector } from '../../../wallets'

interface CheckForMetaMaskProps {
  metaMaskWallet: XyoMetaMaskConnector
}

const CheckForMetaMask: React.FC<CheckForMetaMaskProps> = ({ children, metaMaskWallet }) => {
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

export { CheckForMetaMask }
