import axios, { AxiosResponse } from 'axios'
import { useState } from 'react'

import { useAuthState } from '../../contexts'
import { AuthInterceptors } from './interceptorCallbacks'

/**
 * A hook that intercepts specific axios requests and manages the auth token requirements
 *
 * @returns {Object}
 */
const useAuthInterceptors = (apiDomain: string) => {
  const { dispatch: authDispatch } = useAuthState()
  const [authInterceptor] = useState<AuthInterceptors>(AuthInterceptors.get(authDispatch, apiDomain))

  const newTokenInterceptor = axios.interceptors.response.use<AxiosResponse>(
    authInterceptor.newTokenInterceptor.bind(authInterceptor),
    authInterceptor.unauthorizedInterceptor.bind(authInterceptor)
  )

  const appendTokenInterceptor = axios.interceptors.request.use(
    authInterceptor.appendTokenInterceptor.bind(authInterceptor)
  )

  const teardown = () => {
    axios.interceptors.response.eject(newTokenInterceptor)
    axios.interceptors.request.eject(appendTokenInterceptor)
  }
  return { teardown }
}

export { useAuthInterceptors }
