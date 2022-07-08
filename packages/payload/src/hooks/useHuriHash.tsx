import { XyoApiError } from '@xyo-network/api'
import { Huri, XyoPayload } from '@xyo-network/payload'
import { useCallback } from 'react'

import { FetchHuriHashOptions } from './lib'
import { usePayload } from './usePayload'
import { useResolveHuri } from './useResolveHuri'

/**
 * Resolve a hash or a huri regardless of network
 */
const useHuriHash = (
  huriOrHash?: string | Huri,
  huriUri?: string,
  options?: FetchHuriHashOptions
): [XyoPayload | undefined, boolean, XyoApiError | undefined, boolean | undefined] => {
  const hash = useCallback((huriOrHash?: string | Huri) => {
    if (huriOrHash) {
      if (typeof huriOrHash === 'string') {
        return huriOrHash
      }
      if (huriOrHash instanceof Huri) {
        return huriOrHash.hash
      }
    }
  }, [])

  const foundHash = hash(huriOrHash)

  // Optimistically try to grab the has from the current network and archive
  const [payload, notFound, apiError] = usePayload(foundHash)

  // If payload isn't found, fallback to the huriUri
  const [huriPayload, huriPayloadNotFound, huriApiError, networkNotFound] = useResolveHuri(huriUri, notFound, options)

  return [payload ?? huriPayload, huriPayloadNotFound, apiError ?? huriApiError, networkNotFound]
}

export { useHuriHash }
