import { useTheme } from '@mui/material'
import { ButtonEx, FlexCol } from '@xylabs/sdk-react'
import { XyoMetaMaskConnector } from '@xyo-network/sdk-xyo-client-js'
import { Dispatch, SetStateAction } from 'react'

import { AuthAction, AuthActionTypes } from '../../../contexts'
import { MetaMaskSVG } from './MetaMaskSVG'

interface ConnectWalletProps {
  setCheckedWallet: Dispatch<SetStateAction<boolean>>
  authDispatch: Dispatch<AuthAction>
  MetaMaskService: XyoMetaMaskConnector
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ setCheckedWallet, authDispatch, MetaMaskService }) => {
  const theme = useTheme()

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
    <FlexCol marginBottom={theme.spacing(1)} marginTop={theme.spacing(1)}>
      <ButtonEx size="large" variant="outlined" className="buttons" onClick={connectWallet}>
        <span>
          <MetaMaskSVG style={{ marginRight: '14px', paddingTop: '8px', width: '40px' }} />
        </span>
        Login with MetaMask
      </ButtonEx>
    </FlexCol>
  )
}

export { ConnectWallet }
