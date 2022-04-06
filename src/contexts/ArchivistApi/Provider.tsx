import { XyoApiConfig, XyoApiError, XyoApiResponse, XyoArchivistApi } from '@xyo-network/sdk-xyo-client-js'
import { useCallback, useEffect, useState } from 'react'

import { AuthActionType, useAuthState } from '../Auth'
import { ArchivistApiContext } from './Context'
import { logWithMax } from './logWithMax'

export interface ArchivistApiProviderProps extends XyoApiConfig {
  required?: boolean
  successHistoryMaxDepth?: number
  responseHistoryMaxDepth?: number
  failureHistoryMaxDepth?: number
  errorHistoryMaxDepth?: number
}

export const ArchivistApiProvider: React.FC<ArchivistApiProviderProps> = ({
  required = false,
  successHistoryMaxDepth = 0,
  responseHistoryMaxDepth = 0,
  failureHistoryMaxDepth = 0,
  errorHistoryMaxDepth = 0,
  children,
  ...configProps
}) => {
  const [api, setApi] = useState<XyoArchivistApi>()
  const [config, setConfig] = useState<XyoApiConfig>(configProps)

  const [successHistory] = useState<XyoApiResponse[]>([])
  const [responseHistory] = useState<XyoApiResponse[]>([])
  const [failureHistory] = useState<XyoApiResponse[]>([])
  const [errorHistory] = useState<XyoApiError[]>([])

  const { dispatch: setAuthState } = useAuthState()

  //we are doing this with config since we want a value compare and not a ref compare
  useEffect(() => {
    if (JSON.stringify(config) !== JSON.stringify(configProps)) {
      setConfig(configProps)
    }
  }, [config, configProps])

  const logResponse = useCallback(
    (response: XyoApiResponse) => {
      logWithMax(responseHistory, response, responseHistoryMaxDepth)
    },
    [responseHistory, responseHistoryMaxDepth]
  )

  const onFailure = useCallback(
    (response: XyoApiResponse) => {
      if (response.status === 401) {
        setAuthState?.({ payload: {}, type: AuthActionType.Logout })
      }

      logWithMax(failureHistory, response, failureHistoryMaxDepth)
      logResponse(response)
    },
    [logResponse, failureHistory, failureHistoryMaxDepth, setAuthState]
  )

  const onSuccess = useCallback(
    (response: XyoApiResponse) => {
      logWithMax(successHistory, response, successHistoryMaxDepth)
      logResponse(response)
    },
    [logResponse, successHistory, successHistoryMaxDepth]
  )

  const onError = useCallback(
    (error: XyoApiError) => {
      logWithMax(errorHistory, error, errorHistoryMaxDepth)
    },
    [errorHistory, errorHistoryMaxDepth]
  )

  useEffect(() => {
    setApi(
      new XyoArchivistApi({
        ...config,
        onError,
        onFailure,
        onSuccess,
      })
    )
  }, [config, onError, onFailure, onSuccess])

  return (
    <ArchivistApiContext.Provider
      value={{
        api,
        currentToken: config.jwtToken,
        errorHistory,
        failureHistory,
        provided: true,
        responseHistory,
        successHistory,
      }}
    >
      {api ? children : required ? null : children}
    </ArchivistApiContext.Provider>
  )
}
