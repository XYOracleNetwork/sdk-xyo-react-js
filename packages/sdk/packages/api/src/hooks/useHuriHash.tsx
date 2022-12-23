import { Huri } from '@xyo-network/huri'
import { useCallback } from 'react'

import { FetchHuriHashOptions } from './lib'
import { UseHuriOrHash } from './ResolvePayloadArgs'
import { useLoadPayloadViaApi } from './useLoadPayload'
import { useResolveHuri } from './useResolveHuri'

/**
 * Resolve a hash or a huri regardless of network
 */
export const useHuriHashViaApi = (huriOrHash?: string | Huri, huriUri?: string, options?: FetchHuriHashOptions): UseHuriOrHash => {
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

  const providedHash = hash(huriOrHash)

  //AT: TODO -> Talk about this pattern

  // Optimistically try to grab the has from the current network and archive
  const [payload, notFound, apiError] = useLoadPayloadViaApi(providedHash)

  // if a huriUri was passed, we can safely override the notFound from the hash only query
  const notFoundOverride = huriUri ? true : notFound

  // If payload isn't found, fallback to the huriUri
  const [huriPayload, huriPayloadNotFound, huriApiError, networkNotFound] = useResolveHuri(huriUri, notFoundOverride, options)

  return [payload ?? huriPayload, huriPayloadNotFound, apiError ?? huriApiError, networkNotFound]
}
