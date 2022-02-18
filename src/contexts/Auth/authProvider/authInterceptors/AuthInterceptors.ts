import { AxiosError, AxiosRequestConfig } from 'axios'

import { AuthAction, AuthActionTypes } from '../../AuthStateTypes'

class AuthInterceptors {
  static instance: AuthInterceptors
  private apiDomain: string
  private authDispatch: React.Dispatch<AuthAction>

  private constructor(authDispatch: React.Dispatch<AuthAction>, apiDomain: string) {
    this.authDispatch = authDispatch
    this.apiDomain = apiDomain
  }

  public static get(authDispatch: React.Dispatch<AuthAction>, apiDomain: string) {
    if (!AuthInterceptors.instance) {
      AuthInterceptors.instance = new AuthInterceptors(authDispatch, apiDomain)
    }
    return AuthInterceptors.instance
  }

  public unauthorizedInterceptor(error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const authorizationErrorCodes = [401, 403]
    if (authorizationErrorCodes.includes(error.request?.status) && this.isApiRequestUrl(error.config)) {
      this.authDispatch({ payload: { authError: error }, type: AuthActionTypes.UpdateAuthError })
    }
    return Promise.reject(error)
  }

  private isApiRequestUrl(request: AxiosRequestConfig) {
    return request.url?.startsWith(this.apiDomain)
  }
}

export { AuthInterceptors }
