import { useEffect, useState } from 'react'

import { useAuthApi } from '../../../contexts'

const CheckForMetaMask: React.FC = ({ children }) => {
  const { MetaMaskService } = useAuthApi()
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
