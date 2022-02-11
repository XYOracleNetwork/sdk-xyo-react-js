import { Typography } from '@mui/material'
import { useAsyncEffect } from '@xylabs/sdk-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthActionTypes, useAuthApi, useAuthState } from '../../../contexts'
import { CheckForMetaMask } from './CheckForMetaMask'
import { ConnectWallet } from './ConnectWallet'

const Web3Login: React.FC = () => {
  const navigate = useNavigate()
  const { state: authState, dispatch: authDispatch } = useAuthState()
  const [checkedWallet, setCheckedWallet] = useState(false)
  const { MetaMaskService } = useAuthApi()

  useAsyncEffect(
    async (mounted) => {
      if (checkedWallet && authState.authError === undefined && mounted()) {
        try {
          await MetaMaskService.challengeWallet()
          navigate('/')
        } catch (err) {
          authDispatch({ payload: { authError: err as Error }, type: AuthActionTypes.UpdateAuthError })
          setCheckedWallet(false)
        }
      }
      if (checkedWallet && mounted()) {
        setCheckedWallet(false)
      }
    },
    [authDispatch, authState.authError, checkedWallet, MetaMaskService]
  )

  return (
    <>
      <CheckForMetaMask MetaMaskService={MetaMaskService}>
        <Typography variant="h3">Login with Web3 Wallet</Typography>
        {MetaMaskService.currentAccount && authState.isLoggedIn ? (
          <>
            <p>Authorized: {MetaMaskService.currentAccount}</p>
            <p>Disconnect your account from your wallet to logout</p>
          </>
        ) : (
          <ConnectWallet
            authDispatch={authDispatch}
            setCheckedWallet={setCheckedWallet}
            MetaMaskService={MetaMaskService}
          />
        )}
      </CheckForMetaMask>
    </>
  )
}

export { Web3Login }
