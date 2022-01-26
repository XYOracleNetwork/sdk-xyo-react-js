import { XyoMetaMaskConnector } from '@xyo-network/sdk-xyo-client-js'
import { useEffect, useState } from 'react'

interface CheckForMetaMaskProps {
  MetaMaskService: XyoMetaMaskConnector
}

const CheckForMetaMask: React.FC<CheckForMetaMaskProps> = ({ children, MetaMaskService }) => {
  const [missingMetaMask, setMissingMetaMask] = useState(false)

  useEffect(() => {
    if (!MetaMaskService.isMetaMaskInstalled()) {
      setMissingMetaMask(true)
    } else {
      if (!MetaMaskService.currentAccount) {
        MetaMaskService.isWalletIsConnected()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{missingMetaMask ? <p>Please install MetaMask and reload the app.</p> : children}</>
}

export { CheckForMetaMask }
