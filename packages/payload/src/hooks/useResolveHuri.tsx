import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoApiError } from '@xyo-network/api'
import { Huri, XyoPayload } from '@xyo-network/payload'
import { useNetwork } from '@xyo-network/react-network'
import { useState } from 'react'

import { FetchHuriHashOptions, findHuriNetwork } from './lib'

const useResolveHuri = (
  huriUri?: string,
  dependentNotFound?: boolean,
  options?: FetchHuriHashOptions
): [XyoPayload | undefined, boolean, XyoApiError | undefined, boolean | undefined] => {
  const { network, networks, setNetwork } = useNetwork()
  const [huriPayload, setHuriPayload] = useState<XyoPayload>()
  const [huriPayloadNotFound, setHuriPayloadNotFound] = useState(false)
  const [huriNetworkNotFound, setHuriNetworkNotFound] = useState<boolean>()
  const [huriApiError, setHuriApiError] = useState<XyoApiError>()

  const { changeActiveNetwork } = options ?? {}

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if ((dependentNotFound === undefined || dependentNotFound) && huriUri) {
        const huriInstance = new Huri(huriUri)

        const foundHuriNetwork = findHuriNetwork(huriInstance, networks)

        if (foundHuriNetwork && mounted()) {
          if (network !== foundHuriNetwork && changeActiveNetwork) {
            setNetwork?.(foundHuriNetwork)
            return
          }

          try {
            const huriPayload = await huriInstance.fetch()
            if (mounted()) {
              if (huriPayload) {
                setHuriPayload(huriPayload)
                setHuriPayloadNotFound(false)
              } else {
                setHuriPayloadNotFound(true)
              }
            }
          } catch (e) {
            if (mounted()) {
              setHuriApiError(e as XyoApiError)
            }
          }
        } else {
          setHuriNetworkNotFound(true)
        }
      } else {
        // If the dependent is not found, then assume not found till proven otherwise
        if (dependentNotFound) {
          setHuriPayloadNotFound(true)
        }
      }
    },
    [huriUri, network, networks, dependentNotFound, setNetwork, changeActiveNetwork]
  )

  return [huriPayload, huriPayloadNotFound, huriApiError, huriNetworkNotFound]
}

export { useResolveHuri }
