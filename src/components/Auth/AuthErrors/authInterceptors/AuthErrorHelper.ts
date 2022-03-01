import { AxiosError } from 'axios'

type AuthError = Error | AxiosError

interface FormattedAuthError {
  reAuthenticate: boolean
  error: AuthError
  dialogMessage: string
}

const isAxiosError = (error: AuthError): error is AxiosError => {
  return (error as AxiosError)?.isAxiosError
}

class AuthErrorHelpers {
  public static handleAuthError = (error: AuthError): FormattedAuthError => {
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        dialogMessage:
          'Invalid Credentials or session expired.  Please verify your credentials and try to log in again.',
        error,
        reAuthenticate: true,
      }
    }

    if (isAxiosError(error) && error.response?.status === 403) {
      return {
        dialogMessage: 'Unfortunately, you do not have access to this content.',
        error,
        reAuthenticate: true,
      }
    }
    return {
      dialogMessage: 'Please verify your credentials and try to log in again.',
      error,
      reAuthenticate: false,
    }
  }
}

export { AuthErrorHelpers }
export type { AuthError, FormattedAuthError }
