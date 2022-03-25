import { Typography } from '@mui/material'
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
}) => {
  const [api, setApi] = useState<XyoArchivistApi>()

  const [successHistory, setSuccessHistory] = useState<XyoApiResponse[]>([])
  const [responseHistory, setResponseHistory] = useState<XyoApiResponse[]>([])
  const [failureHistory, setFailureHistory] = useState<XyoApiResponse[]>([])
  const [errorHistory, setErrorHistory] = useState<XyoApiError[]>([])

  // allows children to know the token was set before calling the api
  const [currentToken, setCurrentToken] = useState<string | undefined>(jwtToken)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const logResponse = (response: XyoApiResponse) => {
        if (responseHistoryMaxDepth) {
          logWithMax(responseHistory, response, responseHistoryMaxDepth)
          if (mounted()) {
            setResponseHistory([...responseHistory])
          }
        }
      }

      const onFailure = (response: XyoApiResponse) => {
        //on a 401, we clear the token since it is bad
        if (response.status === 401) {
          if (mounted()) {
            setCurrentToken(undefined)
          }
        }

        if (failureHistoryMaxDepth) {
          logWithMax(failureHistory, response, failureHistoryMaxDepth)
          if (mounted()) {
            setFailureHistory([...failureHistory])
          }
        }

        logResponse(response)
      }

      const onSuccess = (response: XyoApiResponse) => {
        if (successHistoryMaxDepth) {
          logWithMax(successHistory, response, successHistoryMaxDepth)
          if (mounted()) {
            setSuccessHistory([...successHistory])
          }
        }

        logResponse(response)
      }

      const onError = (error: XyoApiError) => {
        if (errorHistoryMaxDepth) {
          logWithMax(errorHistory, error, errorHistoryMaxDepth)
          if (mounted()) {
            setErrorHistory([...errorHistory])
          }
        }
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
      value={{ api, currentToken, errorHistory, failureHistory, responseHistory, successHistory }}
    >
      {api ? children : required ? null : children}
    </ArchivistApiContext.Provider>
  )
}
