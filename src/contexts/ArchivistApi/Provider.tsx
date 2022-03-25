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
  successLogMaxDepth?: number
  responseLogMaxDepth?: number
  failureLogMaxDepth?: number
  errorLogMaxDepth?: number
}

export const ArchivistApiProvider: React.FC<ArchivistApiProviderProps> = ({
  required = false,
  apiDomain,
  children,
  jwtToken,
  successLogMaxDepth = 0,
  responseLogMaxDepth = 0,
  failureLogMaxDepth = 0,
  errorLogMaxDepth = 0,
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
        if (responseLogMaxDepth) {
          logWithMax(responseHistory, response, responseLogMaxDepth)
          if (mounted()) {
            setResponseHistory(responseHistory)
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

        if (failureLogMaxDepth) {
          logWithMax(failureHistory, response, failureLogMaxDepth)
          if (mounted()) {
            setFailureHistory(failureHistory)
          }
        }

        logResponse(response)
      }

      const onSuccess = (response: XyoApiResponse) => {
        if (successLogMaxDepth) {
          logWithMax(successHistory, response, successLogMaxDepth)
          if (mounted()) {
            setSuccessHistory(successHistory)
          }
        }

        logResponse(response)
      }

      const onError = (error: XyoApiError) => {
        if (errorLogMaxDepth) {
          logWithMax(errorHistory, error, errorLogMaxDepth)
          if (mounted()) {
            setErrorHistory(errorHistory)
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
    //intentionally excluding failureHistory & failureLogMaxDepth
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
