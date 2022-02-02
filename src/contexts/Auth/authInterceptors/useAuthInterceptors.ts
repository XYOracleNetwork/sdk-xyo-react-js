import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

import { AuthDispatch } from '../AuthStateTypes'
import { AuthInterceptors } from './AuthInterceptors'

/**
 * A hook that intercepts specific axios requests and manages the auth token requirements
 *
 * @returns {Object}
 */
const useAuthInterceptors = (apiDomain: string, authDispatch: AuthDispatch) => {
  const [newTokenInterceptor, setNewTokenInterceptor] = useState<number | undefined>()
  const [appendTokenInterceptor, setAppendTokenInterceptor] = useState<number | undefined>()
  const [authInterceptor] = useState<AuthInterceptors>(AuthInterceptors.get(authDispatch, apiDomain))

  useEffect(() => {
    if (newTokenInterceptor === undefined) {
      const newTokenInt = axios.interceptors.response.use<AxiosResponse>(
        authInterceptor.newTokenInterceptor.bind(authInterceptor),
        authInterceptor.unauthorizedInterceptor.bind(authInterceptor)
      )
      setNewTokenInterceptor(newTokenInt)
    }
    if (appendTokenInterceptor === undefined) {
      const appendTokenInt = axios.interceptors.request.use(
        authInterceptor.appendTokenInterceptor.bind(authInterceptor)
      )
      setAppendTokenInterceptor(appendTokenInt)
    }
    return () => {
      newTokenInterceptor !== undefined && axios.interceptors.response.eject(newTokenInterceptor)
      appendTokenInterceptor !== undefined && axios.interceptors.request.eject(appendTokenInterceptor)
    }
  }, [appendTokenInterceptor, authInterceptor, newTokenInterceptor])
}

export { useAuthInterceptors }
