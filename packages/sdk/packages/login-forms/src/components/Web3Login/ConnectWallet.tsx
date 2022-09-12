import { Button, ButtonProps } from '@mui/material'
import { XyoMetaMaskConnector } from '@xyo-network/utils'
import { Dispatch, SetStateAction } from 'react'

import { MetaMaskError } from './MetaMaskError'
import { MetaMaskSVG } from './MetaMaskSVG'

interface ConnectWalletProps extends ButtonProps {
  setCheckedWallet: Dispatch<SetStateAction<boolean>>
  metaMaskWallet: XyoMetaMaskConnector
  isLoading: boolean
  setMetaMaskError: Dispatch<SetStateAction<MetaMaskError | undefined>>
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ setCheckedWallet, metaMaskWallet, isLoading, setMetaMaskError, ...props }) => {
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
    <Button
      variant="contained"
      onClick={connectWallet}
      disabled={isLoading}
      startIcon={<MetaMaskSVG style={{ width: '48px' }} />}
      sx={{ mb: 2 }}
      {...props}
    >
      Login with MetaMask
    </Button>
  )
}

export { ConnectWallet }
