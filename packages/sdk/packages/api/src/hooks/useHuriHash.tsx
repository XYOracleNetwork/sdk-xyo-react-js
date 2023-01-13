import { Huri } from '@xyo-network/huri'
import { useCallback } from 'react'

import { FetchHuriHashOptions } from './lib'
import { UseHuriOrHash } from './ResolvePayloadArgs'
import { useLoadPayloadViaApi } from './useLoadPayload'
import { useResolveHuri } from './useResolveHuri'

/**
 * Resolve a hash or a huri regardless of network
 */
/** @deprecated - useResolveHuri in @xyo-network/react-payload-huri */
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

/**
 * What does this hook do?
 * 1. See if first param is huri or hash
 * 2. If so, fetch it
 * 3. Check the second param
 * 4. If its a passed huriUri, pretend the first request was not found
 * 5. Try to resolve the huri
 * 6. return the payload (even if huriUri was passed???) or huriPayload
 *  a. the huriPayload found or not
 *  b. the payload apiError (even if huriUri was passed???) or huriPayloadError
 *  c. the networkNotFound status
 */
