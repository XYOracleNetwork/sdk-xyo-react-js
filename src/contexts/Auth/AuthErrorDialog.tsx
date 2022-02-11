import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { ButtonEx, FlexRow } from '@xylabs/sdk-react'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'

import { AuthActionTypes, AuthDispatch, AuthState } from './AuthStateTypes'

type AuthError = Error | MetaMaskError | AxiosError | undefined
interface MetaMaskError {
  code: number
  message: string
}

const isMetaMaskError = (error: AuthError): error is MetaMaskError => {
  return (error as MetaMaskError)?.message?.includes('MetaMask')
}

const isAxiosError = (error: AuthError): error is AxiosError => {
  return (error as AxiosError)?.isAxiosError
}

const isLoginError = (err: Error | AxiosError | MetaMaskError | undefined) => {
  const loginUrls = ['/user/wallet/verify/', '/user/wallet/challenge/', '/login']
  if (isAxiosError(err)) {
    return loginUrls.some((url) => (err as AxiosError)?.config.url?.endsWith(url))
  } else if (isMetaMaskError(err)) {
    return true
  } else {
    return false
  }
}

interface AuthErrorDialogProps {
  authState: AuthState
  dispatch: AuthDispatch
}

const AuthErrorDialog: React.FC<AuthErrorDialogProps> = ({ authState, dispatch }) => {
  // dialogError decouples the trigger of the modal (authError) from what error message is displayed
  const [dialogError, setDiaLogError] = useState<AuthError>()
  const { authError } = authState

  useEffect(() => {
    if (authError === undefined) {
      // Delay to allow time for the Dialog to close before updating the error message
      // Prevents the error text from change to default right before close
      setTimeout(() => {
        setDiaLogError(undefined)
      }, 500)
    } else {
      setDiaLogError(authError)
    }
  }, [authError, dispatch])

  const handleClose = () => {
    dispatch({ payload: { authError: undefined }, type: AuthActionTypes.UpdateAuthError })
  }

  return (
    <Dialog open={isLoginError(authError)}>
      <DialogTitle>Authorization Error</DialogTitle>
      <DialogContent>
        <FlexRow>
          <Typography variant="body1" marginY={2}>
            Please verify your credentials and try to log in again.
          </Typography>
        </FlexRow>
        <FlexRow>
          <Typography color="error" variant="body1">
            {`${dialogError?.message} [${(dialogError as MetaMaskError)?.code ?? 'Request Failure'}]`}
          </Typography>
        </FlexRow>
      </DialogContent>
      <DialogActions>
        <ButtonEx onClick={handleClose} variant="text">
          Close
        </ButtonEx>
      </DialogActions>
    </Dialog>
  )
}

export { AuthErrorDialog }
