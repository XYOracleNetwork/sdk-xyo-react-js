import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { ButtonEx, FlexRow } from '@xylabs/sdk-react'
import { AxiosError } from 'axios'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { AuthError, AuthErrorHelpers, FormattedAuthError, MetaMaskError, useAuthInterceptors } from './authInterceptors'

export interface AuthErrorDialogProps {
  apiDomain: string
  setReAuth: Dispatch<SetStateAction<boolean>>
}

const AuthErrorDialog: React.FC<AuthErrorDialogProps> = ({ apiDomain, setReAuth }) => {
  // dialogError decouples the trigger of the modal (authError) from what error message is displayed
  const [dialogError, setDiaLogError] = useState<FormattedAuthError>()
  const [authError, setAuthError] = useState<AuthError>()

  useAuthInterceptors(apiDomain, setAuthError)

  useEffect(() => {
    let mounted = true
    if (authError === undefined) {
      // Delay to allow time for the Dialog to close before updating the error message
      // Prevents the error text from change to default right before close
      setTimeout(() => {
        if (mounted) {
          setDiaLogError(undefined)
        }
      }, 500)
    } else {
      const error = AuthErrorHelpers.handleAuthError(authError as AxiosError)
      setDiaLogError(error)
    }
    return () => {
      mounted = false
    }
  }, [authError])

  const handleClose = () => {
    setAuthError(undefined)
  }

  const handleReAuth = () => {
    setReAuth(true)
    setAuthError(undefined)
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
