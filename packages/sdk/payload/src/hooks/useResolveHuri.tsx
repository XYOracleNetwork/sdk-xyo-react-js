import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoApiError } from '@xyo-network/api'
import { Huri, XyoPayload } from '@xyo-network/payload'
import { useNetwork } from '@xyo-network/react-network'
import { useEffect, useState } from 'react'

import { FetchHuriHashOptions, findHuriNetwork } from './lib'
import { UseHuriOrHash } from './ResolvePayloadArgs'

const useResolveHuri = (huriUri?: string, dependentNotFound?: boolean, options?: FetchHuriHashOptions): UseHuriOrHash => {
  const { network, networks, setNetwork } = useNetwork()
  const [huriPayload, setHuriPayload] = useState<XyoPayload>()
  const [huriPayloadNotFound, setHuriPayloadNotFound] = useState<boolean>()
  const [huriNetworkNotFound, setHuriNetworkNotFound] = useState<boolean>()
  const [huriApiError, setHuriApiError] = useState<XyoApiError>()

  const { changeActiveNetwork } = options ?? {}

  //AT: TODO -> Talk about this pattern
  const reset = () => {
    setHuriPayload(undefined)
    setHuriPayloadNotFound(undefined)
    setHuriApiError(undefined)
  }

  useEffect(() => {
    // Initially, sync local not found with dependent's status
    setHuriPayloadNotFound(dependentNotFound)
  }, [dependentNotFound])

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      // if dependent value is resolved, don't do anything, if not resolved, try to resolve huriUri
      if (dependentNotFound && huriUri) {
        reset()
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
              setHuriPayloadNotFound(false)
              setHuriPayload(undefined)
              setHuriApiError(e as XyoApiError)
            }
          }
        } else {
          setHuriNetworkNotFound(true)
        }
      }
    },
    [huriUri, network, networks, dependentNotFound, setNetwork, changeActiveNetwork]
  )

  return [huriPayload, huriPayloadNotFound, huriApiError, huriNetworkNotFound]
}

export { useResolveHuri }
