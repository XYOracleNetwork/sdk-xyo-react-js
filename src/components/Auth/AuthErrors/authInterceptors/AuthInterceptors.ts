import { AxiosError, AxiosRequestConfig } from 'axios'
import { Dispatch } from 'react'

import { AuthError } from './AuthErrorHelper'

class AuthInterceptors {
  static instance: AuthInterceptors
  private apiDomain: string
  private setAuthError: Dispatch<React.SetStateAction<AuthError | undefined>>

  private constructor(setAuthError: Dispatch<React.SetStateAction<AuthError | undefined>>, apiDomain: string) {
    this.setAuthError = setAuthError
    this.apiDomain = apiDomain
  }

  public static get(setAuthError: Dispatch<React.SetStateAction<AuthError | undefined>>, apiDomain: string) {
    if (!AuthInterceptors.instance) {
      AuthInterceptors.instance = new AuthInterceptors(setAuthError, apiDomain)
    }
    return AuthInterceptors.instance
  }

  public unauthorizedInterceptor(error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const authorizationErrorCodes = [401, 403]
    if (authorizationErrorCodes.includes(error.request?.status) && this.isApiRequestUrl(error.config)) {
      this.setAuthError(error)
    }
    return Promise.reject(error)
  }

  private isApiRequestUrl(request: AxiosRequestConfig) {
    return request.url?.startsWith(this.apiDomain)
  }
}

export { AuthInterceptors }
