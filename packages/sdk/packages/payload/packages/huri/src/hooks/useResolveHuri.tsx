import { useAsyncEffect } from '@xylabs/react-shared'
import { Huri } from '@xyo-network/huri'
import { XyoError, XyoErrorSchema } from '@xyo-network/module'
import { XyoPayload } from '@xyo-network/payload-model'
import { useNetwork } from '@xyo-network/react-network'
import { useState } from 'react'

import { findHuriNetwork, UseHuriOrHash } from './lib'

export const useResolveHuri = (huriUri?: string, changeActiveNetwork?: boolean): UseHuriOrHash => {
  const { network, networks, setNetwork } = useNetwork()
  const [huriPayload, setHuriPayload] = useState<XyoPayload>()
  const [huriPayloadNotFound, setHuriPayloadNotFound] = useState<boolean>()
  const [huriNetworkNotFound, setHuriNetworkNotFound] = useState<boolean>()
  const [huriError, setHuriError] = useState<XyoError>()

  //AT: TODO -> Talk about this pattern
  const reset = () => {
    setHuriPayload(undefined)
    setHuriPayloadNotFound(undefined)
    setHuriError(undefined)
  }

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (huriUri) {
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
            const error = e as Error
            if (mounted()) {
              setHuriPayloadNotFound(false)
              setHuriPayload(undefined)
              setHuriError({ message: error.message, schema: XyoErrorSchema, sources: [] })
            }
          }
        } else {
          setHuriNetworkNotFound(true)
        }
      }
    },
    [changeActiveNetwork, huriUri, network, networks, setNetwork],
  )

  return [huriPayload, huriPayloadNotFound, huriError, huriNetworkNotFound]
}
