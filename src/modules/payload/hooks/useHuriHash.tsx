import { Huri, XyoApiError, XyoPayload } from '@xyo-network/sdk-xyo-client-js'
import { useCallback } from 'react'

import { usePayload } from './usePayload'
import { useResolveHuri } from './useResolveHuri'

const useHuriHash = (huriOrHash?: string | Huri, huriUri?: string, changeActiveNetwork?: boolean): [XyoPayload | undefined, boolean, XyoApiError | undefined] => {
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
  const [huriPayload, huriPayloadNotFound, huriApiError] = useResolveHuri(huriUri, notFound, changeActiveNetwork)

  return [payload ?? huriPayload, huriPayloadNotFound, apiError ?? huriApiError]
}

export { useHuriHash }
