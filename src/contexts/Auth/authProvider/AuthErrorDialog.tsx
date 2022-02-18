import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { ButtonEx, FlexRow } from '@xylabs/sdk-react'
import { useEffect, useState } from 'react'

import { AuthActionTypes, AuthDispatch, AuthState } from '../AuthStateTypes'
import { AuthErrorHelpers, FormattedAuthError, MetaMaskError } from './AuthErrorHelper'

export interface AuthErrorDialogProps {
  authState: AuthState
  dispatch: AuthDispatch
}

const AuthErrorDialog: React.FC<AuthErrorDialogProps> = ({ authState, dispatch }) => {
  // dialogError decouples the trigger of the modal (authError) from what error message is displayed
  const [dialogError, setDiaLogError] = useState<FormattedAuthError>()
  const { authError } = authState

  useEffect(() => {
    if (authError === undefined) {
      // Delay to allow time for the Dialog to close before updating the error message
      // Prevents the error text from change to default right before close
      setTimeout(() => {
        setDiaLogError(undefined)
      }, 500)
    } else {
      const error = AuthErrorHelpers.handleAuthError(authError)
      setDiaLogError(error)
    }
  }, [authError, dispatch])

  const handleClose = () => {
    dispatch({ payload: { authError: undefined }, type: AuthActionTypes.UpdateAuthError })
  }

  return (
    <>
      <Dialog open={!!authError}>
        <DialogTitle>Authorization Error</DialogTitle>
        <DialogContent>
          <FlexRow>
            {dialogError?.dialogMessage && (
              <Typography variant="body1" marginY={2}>
                {dialogError?.dialogMessage}
              </Typography>
            )}
          </FlexRow>
          <FlexRow>
            <Typography color="error" variant="body1">
              {`${dialogError?.error.message} [${(dialogError?.error as MetaMaskError)?.code ?? 'Request Failure'}]`}
            </Typography>
          </FlexRow>
        </DialogContent>
        <DialogActions>
          <ButtonEx onClick={handleClose} variant="text">
            Close
          </ButtonEx>
          {dialogError?.reAuthenticate && <ButtonEx variant="text">Login</ButtonEx>}
        </DialogActions>
      </Dialog>
    </>
  )
}

export { AuthErrorDialog }
