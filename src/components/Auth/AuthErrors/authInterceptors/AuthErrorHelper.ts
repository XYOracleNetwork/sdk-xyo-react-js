import { AxiosError } from 'axios'

type AuthError = Error | MetaMaskError | AxiosError

interface MetaMaskError {
  code: number
  message: string
}

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
        dialogMessage: 'Your session may have expired.  Please verify your credentials and try to log in again.',
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
export type { AuthError, FormattedAuthError, MetaMaskError }
