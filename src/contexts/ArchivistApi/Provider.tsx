import { delay } from '@xylabs/sdk-js'
import { useAsyncEffect } from '@xylabs/sdk-react'
import { XyoArchivistApi } from '@xyo-network/sdk-xyo-client-js'
import { useState } from 'react'

import { ArchivistApiContext } from './Context'

export interface ArchivistApiProviderProps {
  apiDomain: string
  jwtToken?: string
  required?: boolean
}

export const ArchivistApiProvider: React.FC<ArchivistApiProviderProps> = ({
  required = false,
  apiDomain,
  children,
  jwtToken,
}) => {
  const [api, setApi] = useState<XyoArchivistApi>()

  // allows children to know the token was set before calling the api
  const [currentToken, setCurrentToken] = useState<string | undefined>(jwtToken)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      setApi(
        new XyoArchivistApi({
          apiDomain,
          jwtToken,
          onFailure: (response) => {
            //on a 401, we clear the token since it is bad
            if (response.status === 401) {
              if (mounted()) {
                setCurrentToken(undefined)
              }
            }
          },
        })
      )
      setCurrentToken(jwtToken)
      await delay(0)
    },
    [apiDomain, jwtToken]
  )

  return (
    <ArchivistApiContext.Provider value={{ api, currentToken }}>
      {api ? children : required ? null : children}
    </ArchivistApiContext.Provider>
  )
}
