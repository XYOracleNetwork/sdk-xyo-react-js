import { WithChildren } from '@xylabs/react-shared'
import { XyoArchivistApi } from '@xyo-network/api'
import { XyoApiConfig, XyoApiError, XyoApiResponse } from '@xyo-network/api-models'
import { useCallback, useEffect, useState } from 'react'

import { ApiContext } from './Context'
import { logWithMax } from './logWithMax'

export interface ApiProviderProps extends XyoApiConfig {
  required?: boolean
  successHistoryMaxDepth?: number
  responseHistoryMaxDepth?: number
  failureHistoryMaxDepth?: number
  errorHistoryMaxDepth?: number
  onFailureCallback?: (statusCode?: number) => void
}

export const ApiProvider: React.FC<WithChildren<ApiProviderProps>> = ({
  required = false,
  successHistoryMaxDepth = 0,
  responseHistoryMaxDepth = 0,
  failureHistoryMaxDepth = 0,
  errorHistoryMaxDepth = 0,
  onFailureCallback,
  children,
  ...configProps
}) => {
  const [api, setApi] = useState<XyoArchivistApi>()
  const [config, setConfig] = useState<XyoApiConfig>(configProps)

  const [successHistory] = useState<XyoApiResponse[]>([])
  const [responseHistory] = useState<XyoApiResponse[]>([])
  const [failureHistory] = useState<XyoApiResponse[]>([])
  const [errorHistory] = useState<XyoApiError[]>([])

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
    [responseHistory, responseHistoryMaxDepth],
  )

  const onFailure = useCallback(
    (response: XyoApiResponse) => {
      onFailureCallback?.(response.status)
      logWithMax(failureHistory, response, failureHistoryMaxDepth)
      logResponse(response)
    },
    [onFailureCallback, failureHistory, failureHistoryMaxDepth, logResponse],
  )

  const onSuccess = useCallback(
    (response: XyoApiResponse) => {
      logWithMax(successHistory, response, successHistoryMaxDepth)
      logResponse(response)
    },
    [logResponse, successHistory, successHistoryMaxDepth],
  )

  const onError = useCallback(
    (error: XyoApiError) => {
      logWithMax(errorHistory, error, errorHistoryMaxDepth)
    },
    [errorHistory, errorHistoryMaxDepth],
  )

  useEffect(() => {
    setApi(
      new XyoArchivistApi({
        ...config,
        onError,
        onFailure,
        onSuccess,
      }),
    )
  }, [config, onError, onFailure, onSuccess])

  return (
    <ApiContext.Provider
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
    </ApiContext.Provider>
  )
}

/** @deprecated use ApiProvider instead */
export const ArchivistApiProvider = ApiProvider
