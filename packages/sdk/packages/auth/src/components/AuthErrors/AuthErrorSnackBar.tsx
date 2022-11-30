import { Alert, Snackbar, SnackbarProps } from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import { XyoApiError } from '@xyo-network/api-models'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { AuthError, AuthErrorHelpers, FormattedAuthError } from './authInterceptors'

interface AuthErrorSnackBarProps extends SnackbarProps {
  setReAuth: Dispatch<SetStateAction<boolean>>
}

/** @deprecated use XyoApiErrorRender to handle api errors from the sdk  */
const AuthErrorSnackbar: React.FC<AuthErrorSnackBarProps> = ({ setReAuth, ...snackBarProps }) => {
  const [snackBarError, setSnackBarError] = useState<FormattedAuthError>()
  const [authError, setAuthError] = useState<AuthError>()

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
      /* eslint-disable deprecation/deprecation */
      const error = AuthErrorHelpers.handleAuthError(authError as XyoApiError)
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
      key="auth-error-snackbar"
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
/* eslint-disable deprecation/deprecation */
export { AuthErrorSnackbar }
