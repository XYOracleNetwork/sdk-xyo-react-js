import { Alert, Snackbar, SnackbarProps } from '@mui/material'
import { ButtonEx } from '@xylabs/sdk-react'
import { AxiosError } from 'axios'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { AuthError, AuthErrorHelpers, FormattedAuthError, useAuthInterceptors } from './authInterceptors'

interface AuthErrorSnackBarProps extends SnackbarProps {
  apiDomain: string
  setReAuth: Dispatch<SetStateAction<boolean>>
}

const AuthErrorSnackbar: React.FC<AuthErrorSnackBarProps> = ({ apiDomain, setReAuth, ...snackBarProps }) => {
  const [snackBarError, setSnackBarError] = useState<FormattedAuthError>()
  const [authError, setAuthError] = useState<AuthError>()

  useAuthInterceptors(apiDomain, setAuthError)

  useEffect(() => {
    let mounted = true
    if (authError === undefined) {
      // Delay to allow time for the Dialog to close before updating the error message
      // Prevents the error text from change to default right before close
      setTimeout(() => {
        if (mounted) {
          setSnackBarError(undefined)
        }
      }, 500)
    } else {
      const error = AuthErrorHelpers.handleAuthError(authError as AxiosError)
      setSnackBarError(error)
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
  }

  return (
    <Snackbar
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      open={!!authError}
      onClose={handleClose}
      {...snackBarProps}
    >
      <Alert
        severity="error"
        action={
          <>
            <ButtonEx padding={0.25} size="small" onClick={handleClose} variant="text">
              Close
            </ButtonEx>
            {snackBarError?.reAuthenticate && (
              <ButtonEx padding={0.25} size="small" onClick={handleReAuth} variant="text">
                Login
              </ButtonEx>
            )}
          </>
        }
      >
        {snackBarError?.dialogMessage}
      </Alert>
    </Snackbar>
  )
}

export { AuthErrorSnackbar }
