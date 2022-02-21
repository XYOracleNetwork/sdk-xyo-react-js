import { Typography } from '@mui/material'
import { useAsyncEffect } from '@xylabs/sdk-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthActionTypes, useAuthApi } from '../../../contexts'
import { LoginForm } from '../LoginForm'
import { CheckForMetaMask } from './CheckForMetaMask'
import { ConnectWallet } from './ConnectWallet'

const Web3Login: React.FC<LoginForm> = ({ dispatch, loggedInAccount }) => {
  const navigate = useNavigate()
  const [checkedWallet, setCheckedWallet] = useState(false)
  const { MetaMaskService } = useAuthApi()
  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useState('')

  useEffect(() => {
    if (!isLoading && token) {
      dispatch({
        payload: { jwtToken: token, loggedInAccount: MetaMaskService.currentAccount },
        type: AuthActionTypes.AuthSuccessful,
      })
      navigate('/')
    }
  }, [isLoading, token, dispatch, navigate, MetaMaskService.currentAccount])

  useEffect(() => {
    if (checkedWallet) {
      setIsLoading(true)
    }
  }, [checkedWallet])

  useAsyncEffect(
    async (mounted) => {
      if (checkedWallet && isLoading) {
        try {
          const { data } = await MetaMaskService.challengeWallet()
          setToken(data.token)
          setIsLoading(false)
        } catch (err) {
          dispatch({ payload: { authError: err as Error }, type: AuthActionTypes.UpdateAuthError })
          setCheckedWallet(false)
          setIsLoading(false)
        }
      }
      if (checkedWallet && token && mounted()) {
        setCheckedWallet(false)
      }
    },
    [dispatch, checkedWallet, MetaMaskService, isLoading]
  )

  return (
    <>
      <CheckForMetaMask MetaMaskService={MetaMaskService}>
        <Typography variant="h3">Login with Web3 Wallet</Typography>
        {MetaMaskService.currentAccount && loggedInAccount ? (
          <>
            <p>Authorized: {MetaMaskService.currentAccount}</p>
            <p>Disconnect your account from your wallet to logout</p>
          </>
        ) : (
          <ConnectWallet
            isLoading={isLoading}
            authDispatch={dispatch}
            setCheckedWallet={setCheckedWallet}
            MetaMaskService={MetaMaskService}
          />
        )}
      </CheckForMetaMask>
    </>
  )
}

export { Web3Login }
