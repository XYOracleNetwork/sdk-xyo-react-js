import axios, { AxiosResponse } from 'axios'
import { Dispatch, useEffect, useState } from 'react'

import { AuthError } from './AuthErrorHelper'
import { AuthInterceptors } from './AuthInterceptors'

const useAuthInterceptors = (
  apiDomain: string,
  setAuthError: Dispatch<React.SetStateAction<AuthError | undefined>>
) => {
  const [unauthorizedInterceptor, setNewUnauthorizedInterceptor] = useState<number | undefined>()
  const [authInterceptor] = useState<AuthInterceptors>(AuthInterceptors.get(setAuthError, apiDomain))

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
