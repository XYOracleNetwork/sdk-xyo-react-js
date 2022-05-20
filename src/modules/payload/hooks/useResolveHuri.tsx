import { useAsyncEffect } from '@xylabs/sdk-react'
import { XyoApiError } from '@xyo-network/api'
import { Huri, XyoPayload } from '@xyo-network/core'
import { XyoNetworkPayload } from '@xyo-network/network'
import { useState } from 'react'

import { useNetwork } from '../../network'
import { FetchHuriHashOptions, findHuriNetwork } from './lib'

const useResolveHuri = (huriUri?: string, dependentNotFound?: boolean, options?: FetchHuriHashOptions): [XyoPayload | undefined, boolean, XyoApiError | undefined] => {
  const { network, networks, setNetwork } = useNetwork()
  const [huriNetwork, setHuriNetwork] = useState<XyoNetworkPayload>()
  const [huriPayload, setHuriPayload] = useState<XyoPayload>()
  const [huriPayloadNotFound, setHuriPayloadNotFound] = useState(false)
  const [huriApiError, setHuriApiError] = useState<XyoApiError>()

  const { changeActiveNetwork } = options ?? {}

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if ((dependentNotFound === undefined || dependentNotFound) && huriUri && network !== huriNetwork) {
        const huriInstance = new Huri(huriUri)

        const foundHuriNetwork = findHuriNetwork(huriInstance, networks)

        // Update when we found a huri network and it doesn't match the current one
        if (foundHuriNetwork && mounted()) {
          setHuriNetwork(huriNetwork)
          if (network !== foundHuriNetwork && changeActiveNetwork) {
            setNetwork?.(foundHuriNetwork)
            return
          }

          // If no matching network try to resolve the huri itself
          try {
            const huriPayload = await huriInstance.fetch()
            if (mounted()) {
              if (huriPayload) {
                setHuriPayload(huriPayload)
              } else {
                setHuriPayloadNotFound(true)
              }
            }
          } catch (e) {
            if (mounted()) {
              setHuriApiError(e as XyoApiError)
            }
          }
        }
      }
    },
    [huriNetwork, huriUri, network, networks, dependentNotFound, setNetwork, changeActiveNetwork]
  )

  return [huriPayload, huriPayloadNotFound, huriApiError]
}

export { useResolveHuri }
