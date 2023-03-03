import { Alert, AlertTitle, Typography } from '@mui/material'
import { assertEx } from '@xylabs/assert'
import { useAsyncEffect } from '@xylabs/react-shared'
import { AuthActionType } from '@xyo-network/react-auth'
import { useWalletService } from '@xyo-network/react-wallet-service'
import { useEffect, useState } from 'react'

import { LoginForm } from '../LoginForm'
import { useHandleReturnUrl } from '../useHandleReturnUrl'
import { AuthenticatedAlert } from './AuthenticatedAlert'
import { CheckForMetaMask } from './CheckForMetaMask'
import { ConnectWallet } from './ConnectWallet'
import { MetaMaskError } from './MetaMaskError'

const Web3Login: React.FC<LoginForm> = ({ dispatch, loggedInAccount, onSuccess }) => {
  const { handleReturnUrl } = useHandleReturnUrl()
  const [checkedWallet, setCheckedWallet] = useState(false)
  const { metaMaskWallet } = useWalletService()
  const [token, setToken] = useState('')
  const [metaMaskError, setMetaMaskError] = useState<MetaMaskError>()
  const [xyoApiError, setXyoApiError] = useState<Error>()
  const [newAuthentication, setNewAuthentication] = useState(false)

  useEffect(() => {
    if (newAuthentication) {
      dispatch({
        payload: { issuer: api?.config.apiDomain, jwtToken: token, loggedInAccount: metaMaskWallet.currentAccount },
        type: AuthActionType.AuthSuccessful,
      })
      handleReturnUrl()
      onSuccess?.()
      setNewAuthentication(false)
    }
  }, [token, dispatch, api?.config.apiDomain, metaMaskWallet.currentAccount, handleReturnUrl, onSuccess, newAuthentication])

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (checkedWallet && api) {
        try {
          // Get the message to sign from the server
          const { state: message } = assertEx(await api.account(metaMaskWallet.currentAccount).challenge.post())

          // Sign it with metamask
          const signature = assertEx(await metaMaskWallet.signMessage(assertEx(message)))

          // Send to server for verification
          const { token } = assertEx(await api.account(metaMaskWallet.currentAccount).verify.post({ message: message as string, signature }))

          if (mounted()) {
            setToken(assertEx(token))
            setNewAuthentication(true)
          }
        } catch (err) {
          setXyoApiError(err as XyoApiError)
        }
        return
      }

      // once we show the dialog, reset wallet check
      setCheckedWallet(false)
    },
    [dispatch, checkedWallet, metaMaskWallet, api, metaMaskWallet.currentAccount],
  )

  useEffect(() => {
    if (newAuthentication || xyoApiError) {
      setCheckedWallet(false)
    }
  }, [newAuthentication, xyoApiError])

  return (
    <CheckForMetaMask metaMaskWallet={metaMaskWallet}>
      <Typography variant="h3" mb={2}>
        Authenticate with Web3 Wallet
      </Typography>
      <AuthenticatedAlert metaMaskAccount={metaMaskWallet.currentAccount} authStateAccount={loggedInAccount} sx={{ mb: 2 }} />
      <ConnectWallet
        checkedWallet={checkedWallet}
        setCheckedWallet={setCheckedWallet}
        metaMaskWallet={metaMaskWallet}
        setMetaMaskError={setMetaMaskError}
      />
      {metaMaskError && (
        <>
          <Alert severity={'error'}>
            <AlertTitle>Error Connecting to MetaMask:</AlertTitle>
            {metaMaskError.message}
          </Alert>
        </>
      )}
      {xyoApiError && (
        <Alert severity={'error'}>
          <AlertTitle>Error making request to confirm wallet access:</AlertTitle>
          {xyoApiError.message}
        </Alert>
      )}
    </CheckForMetaMask>
  )
}

export { Web3Login }
