import { Typography } from '@mui/material'
import { useAsyncEffect } from '@xylabs/react-shared'
import { assertEx } from '@xylabs/sdk-js'
import { XyoApiError } from '@xyo-network/api'
import { useArchivistApi } from '@xyo-network/react-archivist-api'
import { AuthActionType } from '@xyo-network/react-auth'
import { useWalletService } from '@xyo-network/react-wallet-service'
import { useEffect, useState } from 'react'

import { LoginForm } from '../LoginForm'
import { useHandleReturnUrl } from '../useHandleReturnUrl'
import { CheckForMetaMask } from './CheckForMetaMask'
import { ConnectWallet } from './ConnectWallet'
import { MetaMaskError } from './MetaMaskError'

const Web3Login: React.FC<LoginForm> = ({ dispatch, loggedInAccount, onSuccess }) => {
  const { handleReturnUrl } = useHandleReturnUrl()
  const [checkedWallet, setCheckedWallet] = useState(false)
  const { api } = useArchivistApi()
  const { metaMaskWallet } = useWalletService()
  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useState('')
  const [metaMaskError, setMetaMaskError] = useState<MetaMaskError>()
  const [xyoApiError, setXyoApiError] = useState<XyoApiError>()

  useEffect(() => {
    if (!isLoading && token && !loggedInAccount) {
      dispatch({
        payload: { issuer: api?.config.apiDomain, jwtToken: token, loggedInAccount: metaMaskWallet.currentAccount },
        type: AuthActionType.AuthSuccessful,
      })
      handleReturnUrl()
      onSuccess?.()
    }
  }, [isLoading, token, dispatch, api.config.apiDomain, metaMaskWallet.currentAccount, handleReturnUrl, onSuccess, loggedInAccount])

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
    [dispatch, checkedWallet, metaMaskWallet, isLoading, api, token],
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
