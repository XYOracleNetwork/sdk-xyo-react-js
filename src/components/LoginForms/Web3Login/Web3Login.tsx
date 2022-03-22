import { Typography } from '@mui/material'
import { useAsyncEffect } from '@xylabs/sdk-react'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'

import { AuthActionType, useArchivistApi, useWalletService } from '../../../contexts'
import { LoginForm } from '../LoginForm'
import { useHandleReturnUrl } from '../useHandleReturnUrl'
import { CheckForMetaMask } from './CheckForMetaMask'
import { ConnectWallet } from './ConnectWallet'
import { MetaMaskError } from './MetaMaskError'

const Web3Login: React.FC<LoginForm> = ({ dispatch, loggedInAccount }) => {
  const { handleReturnUrl } = useHandleReturnUrl()
  const [checkedWallet, setCheckedWallet] = useState(false)
  const { authApi } = useArchivistApi()
  const { metaMaskWallet } = useWalletService()
  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useState('')
  const [metaMaskError, setMetaMaskError] = useState<MetaMaskError>()
  const [axiosError, setAxiosError] = useState<AxiosError>()

  useEffect(() => {
    if (!isLoading && token) {
      dispatch({
        payload: { jwtToken: token, loggedInAccount: metaMaskWallet.currentAccount },
        type: AuthActionType.AuthSuccessful,
      })
      handleReturnUrl()
    }
  }, [isLoading, token, dispatch, metaMaskWallet.currentAccount, handleReturnUrl])

  useEffect(() => {
    if (checkedWallet) {
      setIsLoading(true)
    }
  }, [checkedWallet])

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (checkedWallet && isLoading && authApi) {
        try {
          // Get the message to sign from the server
          const { data } = await authApi.walletChallenge(metaMaskWallet.currentAccount)
          const { state: message } = data

          // Sign it with metamask
          const signature = await metaMaskWallet.signMessage(message)

          // Send to server for verification
          const { data: verifyData } = await authApi.walletVerify(
            metaMaskWallet.currentAccount,
            message,
            signature as string
          )

          setToken(verifyData.token)
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
    [dispatch, checkedWallet, metaMaskWallet, isLoading, authApi, token]
  )

  return (
    <>
      <CheckForMetaMask metaMaskWallet={metaMaskWallet}>
        <Typography variant="h3">Login with Web3 Wallet</Typography>
        {metaMaskWallet.currentAccount && loggedInAccount ? (
          <>
            <p>Authorized: {metaMaskWallet.currentAccount}</p>
            <p>Disconnect your account from your wallet to logout</p>
          </>
        ) : (
          <>
            <ConnectWallet
              isLoading={isLoading}
              setCheckedWallet={setCheckedWallet}
              metaMaskWallet={metaMaskWallet}
              setMetaMaskError={setMetaMaskError}
            />
            {metaMaskError && (
              <>
                <Typography variant="body1" mt={2} color="error">
                  Error Connecting to MetaMask:
                </Typography>
                <Typography variant="body1" mt={2} color="error">
                  {metaMaskError.message}
                </Typography>
              </>
            )}
            {axiosError && (
              <Typography variant="body1" mt={2} color="error">
                Error making request to confirm wallet access: {axiosError.message}
              </Typography>
            )}
          </>
        )}
      </CheckForMetaMask>
    </>
  )
}

export { Web3Login }
