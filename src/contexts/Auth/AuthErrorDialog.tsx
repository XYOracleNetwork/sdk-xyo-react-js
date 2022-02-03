import { Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Typography } from '@mui/material'
import { ButtonEx, FlexRow } from '@xylabs/sdk-react'
import { AxiosError } from 'axios'

import { AuthActionTypes, AuthDispatch, AuthState } from './AuthStateTypes'

const toAxiosError = (error: Error | AxiosError | undefined) => {
  return (error as AxiosError)?.isAxiosError ? (error as AxiosError) : undefined
}

interface AuthErrorDialogProps extends DialogProps {
  authState: AuthState
  dispatch: AuthDispatch
}

const AuthErrorDialog: React.FC<AuthErrorDialogProps> = ({ authState, dispatch, ...props }) => {
  const { authError } = authState
  const axiosError = toAxiosError(authError)
  const message = authError?.message ?? authError?.toString()

  const handleClose = () => {
    dispatch({ payload: { authError: undefined }, type: AuthActionTypes.UpdateAuthError })
  }

  return (
    <Dialog {...props}>
      <DialogTitle>Authorization Error</DialogTitle>
      <DialogContent>
        <FlexRow>
          <Typography variant="body1" marginY={2}>
            Unfortunately, you are not authorized to make this request.
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
        <ButtonEx onClick={handleClose} variant="text">
          Login
        </ButtonEx>
      </DialogActions>
    </Dialog>
  )
}

export { AuthErrorDialog }
