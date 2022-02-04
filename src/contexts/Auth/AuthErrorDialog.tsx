import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { ButtonEx, FlexRow } from '@xylabs/sdk-react'
import { AxiosError } from 'axios'

import { AuthActionTypes, AuthDispatch, AuthState } from './AuthStateTypes'

const toAxiosError = (error: Error | AxiosError | undefined) => {
  return (error as AxiosError)?.isAxiosError ? (error as AxiosError) : undefined
}

const isLoginError = (err: Error | AxiosError | undefined) => {
  const loginUrls = ['/user/wallet/verify/', '/login']
  if ((err as AxiosError)?.isAxiosError) {
    return loginUrls.some((url) => (err as AxiosError)?.config.url?.endsWith(url))
  } else {
    return false
  }
}

interface AuthErrorDialogProps {
  authState: AuthState
  dispatch: AuthDispatch
}

const AuthErrorDialog: React.FC<AuthErrorDialogProps> = ({ authState, dispatch }) => {
  const { authError } = authState
  const axiosError = toAxiosError(authError)
  const message = authError?.message ?? authError?.toString()

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
            {axiosError ? `${message} [${axiosError?.code ?? 'Connection Failure'}]` : `${message}`}
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
