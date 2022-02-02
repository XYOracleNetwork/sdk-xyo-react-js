import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import React from 'react'

import { AuthAction, AuthActionTypes } from '../../contexts'

class AuthInterceptors {
  static instance: AuthInterceptors
  private apiDomain: string
  private token = localStorage.getItem('token')
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

  public newTokenInterceptor(response: AxiosResponse) {
    if (this.isLoginRoute(response)) {
      const { token: tokenFromApi } = response.data

      localStorage.setItem('token', tokenFromApi)
      this.token = tokenFromApi

      this.authDispatch({ payload: { isLoggedIn: true }, type: AuthActionTypes.UpdateIsLoggedIn })
    }
    return response
  }

  public unauthorizedInterceptor(error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response?.status === 401) {
      this.token = ''
      localStorage.setItem('token', this.token)
      this.authDispatch({ payload: {}, type: AuthActionTypes.Logout })
      // using instead of useNavigate so hook isn't required to be used inside of a <Router>
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }

  public appendTokenInterceptor(request: AxiosRequestConfig) {
    if (this.isApiRequestUrl(request) && this.token && request.headers) {
      request.headers['Authorization'] = `Bearer ${this.token}`
    }
    return request
  }

  private isLoginRoute(response: AxiosResponse) {
    const isApiUrl = response.config.url?.startsWith(this.apiDomain)
    const loginUrls = ['/user/wallet/verify/', '/login']
    const isLoginUrl = loginUrls.some((url) => response.config.url?.endsWith(url))

    return isApiUrl && isLoginUrl && response.data.token
  }

  private isApiRequestUrl(request: AxiosRequestConfig) {
    return request.url?.startsWith(this.apiDomain)
  }
}

export { AuthInterceptors }
