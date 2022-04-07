import { XyoMetaMaskConnector } from '@xyo-network/sdk-xyo-client-js'
import { ReactNode, useEffect, useState } from 'react'

interface CheckForMetaMaskProps {
  metaMaskWallet: XyoMetaMaskConnector
  children?: ReactNode
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
