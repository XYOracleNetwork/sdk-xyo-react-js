import axios, { AxiosResponse } from 'axios'
import { useState } from 'react'

import { useAuthState } from '../../contexts'
import { AuthInterceptors } from './interceptorCallbacks'

/**
 * A hook that intercepts specific axios requests and manages the auth token requirements
 *
 * @returns {Object}
 */
const useAxiosInterceptors = () => {
  const { dispatch: authDispatch } = useAuthState()
  const [authInterceptor] = useState<AuthInterceptors>(AuthInterceptors.get(authDispatch))

  const newTokenInterceptor = axios.interceptors.response.use<AxiosResponse>(
    authInterceptor.newTokenInterceptor,
    authInterceptor.unauthorizedInterceptor
  )

  const appendTokenInterceptor = axios.interceptors.request.use(authInterceptor.appendTokenInterceptor)

  const teardown = () => {
    axios.interceptors.response.eject(newTokenInterceptor)
    axios.interceptors.request.eject(appendTokenInterceptor)
  }
  return { teardown }
}

export { useAxiosInterceptors }
