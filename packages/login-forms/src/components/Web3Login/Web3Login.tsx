import { Typography } from '@mui/material'
import { assertEx } from '@xylabs/sdk-js'
import { useAsyncEffect } from '@xylabs/sdk-react'
import { XyoApiError } from '@xyo-network/api'
import { useArchivistApi } from '@xyo-network/react-archivist-api'
import { AuthActionType, AuthServiceId } from '@xyo-network/react-auth'
import { useWalletService } from '@xyo-network/react-wallet-service'
import { useEffect, useState } from 'react'

import { LoginForm } from '../LoginForm'
import { useHandleReturnUrl } from '../useHandleReturnUrl'
import { CheckForMetaMask } from './CheckForMetaMask'
import { ConnectWallet } from './ConnectWallet'
import { MetaMaskError } from './MetaMaskError'

const Web3Login: React.FC<LoginForm> = ({ dispatch, loggedInAccount, activeAuthServiceId, setActiveAuthServiceId }) => {
  const { handleReturnUrl } = useHandleReturnUrl()
  const [checkedWallet, setCheckedWallet] = useState(false)
  const { api } = useArchivistApi()
  const { metaMaskWallet } = useWalletService()
  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useState('')
  const [metaMaskError, setMetaMaskError] = useState<MetaMaskError>()
  const [xyoApiError, setXyoApiError] = useState<XyoApiError>()

  useEffect(() => {
    if (!isLoading && token && activeAuthServiceId === AuthServiceId.Web3Wallet) {
      dispatch({
        payload: { jwtToken: token, loggedInAccount: metaMaskWallet.currentAccount },
        type: AuthActionType.AuthSuccessful,
      })
      handleReturnUrl()
      setActiveAuthServiceId?.(AuthServiceId.None)
    }
  }, [isLoading, token, dispatch, metaMaskWallet.currentAccount, handleReturnUrl, activeAuthServiceId, setActiveAuthServiceId])

  useEffect(() => {
    if (checkedWallet) {
      setIsLoading(true)
    }
  }, [checkedWallet])

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (checkedWallet && isLoading && api && !token) {
        try {
          // Get the message to sign from the server
          const { state: message } = assertEx(await api.account(metaMaskWallet.currentAccount).challenge.post())

          // Sign it with metamask
          const signature = assertEx(await metaMaskWallet.signMessage(assertEx(message)))

          // Send to server for verification
          const { token } = assertEx(await api.account(metaMaskWallet.currentAccount).verify.post({ message: message as string, signature }))

          setToken(assertEx(token))
          setIsLoading(false)
        } catch (err) {
          setCheckedWallet(false)
          setIsLoading(false)
          setXyoApiError(err as XyoApiError)
        }
      }
      if (checkedWallet && token && mounted()) {
        setCheckedWallet(false)
      }
    },
    [dispatch, checkedWallet, metaMaskWallet, isLoading, api, token]
  )

  return (
    <CheckForMetaMask metaMaskWallet={metaMaskWallet}>
      <Typography variant="h3">Login with Web3 Wallet</Typography>
      {metaMaskWallet.currentAccount && loggedInAccount ? (
        <>
          <p>Authorized: {metaMaskWallet.currentAccount}</p>
          <p>Disconnect your account from your wallet to logout</p>
        </>
      ) : (
        <>
          <ConnectWallet isLoading={isLoading} setCheckedWallet={setCheckedWallet} metaMaskWallet={metaMaskWallet} setMetaMaskError={setMetaMaskError} />
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
          {xyoApiError && (
            <Typography variant="body1" mt={2} color="error">
              Error making request to confirm wallet access: {xyoApiError.message}
            </Typography>
          )}
        </>
      )}
    </CheckForMetaMask>
  )
}

export { Web3Login }
