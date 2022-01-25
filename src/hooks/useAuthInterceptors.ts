import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

import { getApiDomain } from '../../lib'
import { useAuthState } from './AuthContext'
import { AuthActionTypes } from './AuthStateTypes'

const apiDomain = getApiDomain()

const isApiRequestUrl = (request: AxiosRequestConfig) => request.url?.startsWith(apiDomain)

const isLoginRoute = (response: AxiosResponse) => {
  const isApiUrl = response.config.url?.startsWith(apiDomain)
  const loginUrls = ['/user/wallet/verify/', '/login']
  const isLoginUrl = loginUrls.some((url) => response.config.url?.endsWith(url))

  return isApiUrl && isLoginUrl && response.data.token
}

/**
 * A hook that intercepts specific axios requests and manages the auth token requirements
 *
 * @returns {Object}
 */
const useAxiosInterceptors = () => {
  const { dispatch: authDispatch } = useAuthState()

  let token = localStorage.getItem('token')

  const newTokenInterceptor = axios.interceptors.response.use<AxiosResponse>(
    (response: AxiosResponse) => {
      if (isLoginRoute(response)) {
        const { token: tokenFromApi } = response.data

        localStorage.setItem('token', tokenFromApi)
        token = tokenFromApi

        authDispatch({ payload: { isLoggedIn: true }, type: AuthActionTypes.UpdateIsLoggedIn })
      }
      return response
    },
    (error: AxiosError) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      if (error.response?.status === 401) {
        token = ''
        localStorage.setItem('token', token)
        authDispatch({ payload: {}, type: AuthActionTypes.Logout })
        // using instead of useNavigate so hook isn't required to be used inside of a <Router>
        window.location.href = '/login'
      }
      return Promise.reject(error)
    }
  )

  const appendTokenInterceptor = axios.interceptors.request.use((request: AxiosRequestConfig) => {
    if (isApiRequestUrl(request) && token && request.headers) {
      request.headers['Authorization'] = `Bearer ${token}`
    }
    return request
  })

  const teardown = () => {
    axios.interceptors.response.eject(newTokenInterceptor)
    axios.interceptors.request.eject(appendTokenInterceptor)
  }
  return { teardown }
}

export { useAxiosInterceptors }
