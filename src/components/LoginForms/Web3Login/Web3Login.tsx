import { Typography } from '@mui/material'
import { useAsyncEffect } from '@xylabs/sdk-react'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthActionTypes, useAuthApi } from '../../../contexts'
import { HandleReturnPath } from '../HandleReturnPath'
import { LoginForm } from '../LoginForm'
import { CheckForMetaMask } from './CheckForMetaMask'
import { ConnectWallet } from './ConnectWallet'
import { MetaMaskError } from './MetaMaskError'

const Web3Login: React.FC<LoginForm> = ({ dispatch, loggedInAccount }) => {
  const navigate = useNavigate()
  const [checkedWallet, setCheckedWallet] = useState(false)
  const { MetaMaskService } = useAuthApi()
  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useState('')
  const [metaMaskError, setMetaMaskError] = useState<MetaMaskError>()
  const [axiosError, setAxiosError] = useState<AxiosError>()

  useEffect(() => {
    if (!isLoading && token) {
      dispatch({
        payload: { jwtToken: token, loggedInAccount: MetaMaskService.currentAccount },
        type: AuthActionTypes.AuthSuccessful,
      })
      navigate(HandleReturnPath())
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
          setCheckedWallet(false)
          setIsLoading(false)
          setAxiosError(err as AxiosError)
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
          <>
            <ConnectWallet
              isLoading={isLoading}
              setCheckedWallet={setCheckedWallet}
              MetaMaskService={MetaMaskService}
              setMetaMaskError={setMetaMaskError}
            />
            {metaMaskError && (
              <Typography variant="body1" mt={2} color="error">
                Error Connecting to MetaMask: {metaMaskError.message}
              </Typography>
            )}
            {axiosError && (
              <Typography variant="body1" mt={2} color="error">
                Error making confirming wallet access: {axiosError.message}
              </Typography>
            )}
          </>
        )}
      </CheckForMetaMask>
    </>
  )
}

export { Web3Login }
