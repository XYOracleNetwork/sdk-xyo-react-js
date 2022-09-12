import { Button, ButtonProps } from '@mui/material'
import { XyoMetaMaskConnector } from '@xyo-network/utils'
import { Dispatch, SetStateAction } from 'react'

import { MetaMaskError } from './MetaMaskError'
import { MetaMaskSVG } from './MetaMaskSVG'

interface ConnectWalletProps extends ButtonProps {
  setCheckedWallet: Dispatch<SetStateAction<boolean>>
  checkedWallet?: boolean
  metaMaskWallet: XyoMetaMaskConnector
  setMetaMaskError: Dispatch<SetStateAction<MetaMaskError | undefined>>
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ setCheckedWallet, checkedWallet, metaMaskWallet, setMetaMaskError, ...props }) => {
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
      disabled={checkedWallet}
      startIcon={<MetaMaskSVG style={{ width: '48px' }} />}
      sx={{ mb: 2 }}
      {...props}
    >
      MetaMask
    </Button>
  )
}

export { ConnectWallet }
