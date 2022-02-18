import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { ButtonEx, FlexRow } from '@xylabs/sdk-react'
import { useEffect, useState } from 'react'

import { AuthActionTypes, AuthErrorHelpers, FormattedAuthError, MetaMaskError, useAuthState } from '../../contexts'

const AuthErrorDialog: React.FC = () => {
  const { state: authState, dispatch: authDispatch } = useAuthState()
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
  }, [authError, authDispatch])

  const handleClose = () => {
    authDispatch({ payload: { authError: undefined }, type: AuthActionTypes.UpdateAuthError })
  }

  const handleReAuth = () => {
    authDispatch({ payload: { reAuthenticate: true }, type: AuthActionTypes.UpdateReAuthenticate })
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
          {dialogError?.reAuthenticate && (
            <ButtonEx onClick={handleReAuth} variant="text">
              Login
            </ButtonEx>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}

export { AuthErrorDialog }
