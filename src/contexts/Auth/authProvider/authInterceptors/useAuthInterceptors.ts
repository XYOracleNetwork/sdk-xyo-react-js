import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

import { AuthDispatch } from '../../AuthStateTypes'
import { AuthInterceptors } from './AuthInterceptors'

const useAuthInterceptors = (apiDomain: string, authDispatch: AuthDispatch) => {
  const [unauthorizedInterceptor, setNewUnauthorizedInterceptor] = useState<number | undefined>()
  const [authInterceptor] = useState<AuthInterceptors>(AuthInterceptors.get(authDispatch, apiDomain))

  useEffect(() => {
    if (unauthorizedInterceptor === undefined) {
      const unAuthInt = axios.interceptors.response.use<AxiosResponse>(
        undefined,
        authInterceptor.unauthorizedInterceptor.bind(authInterceptor)
      )
      setNewUnauthorizedInterceptor(unAuthInt)
    }
    return () => {
      unauthorizedInterceptor !== undefined && axios.interceptors.request.eject(unauthorizedInterceptor)
    }
  }, [unauthorizedInterceptor, authInterceptor])
}

export { useAuthInterceptors }
