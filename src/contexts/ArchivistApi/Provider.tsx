import { delay } from '@xylabs/sdk-js'
import { useAsyncEffect } from '@xylabs/sdk-react'
import { XyoApiError, XyoApiResponse, XyoArchivistApi } from '@xyo-network/sdk-xyo-client-js'
import { useState } from 'react'

import { ArchivistApiContext } from './Context'
import { logWithMax } from './logWithMax'

export interface ArchivistApiProviderProps {
  apiDomain: string
  jwtToken?: string
  required?: boolean
  successHistoryMaxDepth?: number
  responseHistoryMaxDepth?: number
  failureHistoryMaxDepth?: number
  errorHistoryMaxDepth?: number
  onUnauthorized?: (response: XyoApiResponse) => void
}

export const ArchivistApiProvider: React.FC<ArchivistApiProviderProps> = ({
  required = false,
  apiDomain,
  children,
  jwtToken,
  successHistoryMaxDepth = 0,
  responseHistoryMaxDepth = 0,
  failureHistoryMaxDepth = 0,
  errorHistoryMaxDepth = 0,
  onUnauthorized,
}) => {
  const [api, setApi] = useState<XyoArchivistApi>()

  const [successHistory] = useState<XyoApiResponse[]>([])
  const [responseHistory] = useState<XyoApiResponse[]>([])
  const [failureHistory] = useState<XyoApiResponse[]>([])
  const [errorHistory] = useState<XyoApiError[]>([])

  // allows children to know the token was set before calling the api
  const [currentToken, setCurrentToken] = useState<string | undefined>(jwtToken)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const logResponse = (response: XyoApiResponse) => {
        logWithMax(responseHistory, response, responseHistoryMaxDepth)
      }

      const onFailure = (response: XyoApiResponse) => {
        if (response.status === 401) {
          if (mounted()) {
            onUnauthorized?.(response)
          }
        }

        logWithMax(failureHistory, response, failureHistoryMaxDepth)
        logResponse(response)
      }

      const onSuccess = (response: XyoApiResponse) => {
        logWithMax(successHistory, response, successHistoryMaxDepth)
        logResponse(response)
      }

      const onError = (error: XyoApiError) => {
        logWithMax(errorHistory, error, errorHistoryMaxDepth)
      }

      setApi(
        new XyoArchivistApi({
          apiDomain,
          jwtToken,
          onError,
          onFailure,
          onSuccess,
        })
      )
      setCurrentToken(jwtToken)
      await delay(0)
    },
    //intentionally excluding history items
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [apiDomain, jwtToken]
  )

  return (
    <ArchivistApiContext.Provider
      value={{ api, currentToken, errorHistory, failureHistory, provided: true, responseHistory, successHistory }}
    >
      {api ? children : required ? null : children}
    </ArchivistApiContext.Provider>
  )
}
