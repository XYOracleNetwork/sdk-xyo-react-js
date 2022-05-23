import { XyoApiError } from '@xyo-network/api'
import { Huri, XyoPayload } from '@xyo-network/core'
import { useCallback } from 'react'

import { FetchHuriHashOptions } from './lib'
import { usePayload } from './usePayload'
import { useResolveHuri } from './useResolveHuri'

const useHuriHash = (huriOrHash?: string | Huri, huriUri?: string, options?: FetchHuriHashOptions): [XyoPayload | undefined, boolean, XyoApiError | undefined] => {
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

  const [payload, notFound, apiError] = usePayload(hash(huriOrHash))
  const [huriPayload, huriPayloadNotFound, huriApiError] = useResolveHuri(huriUri, notFound, options)

  return [payload ?? huriPayload, huriPayloadNotFound, apiError ?? huriApiError]
}

export { useHuriHash }
