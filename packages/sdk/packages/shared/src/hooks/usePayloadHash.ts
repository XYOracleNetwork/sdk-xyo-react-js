import { PayloadHasher } from '@xyo-network/core'
import { Payload } from '@xyo-network/payload-model'
import { DependencyList, useMemo } from 'react'

import { usePromise } from './usePromise'

export const usePayloadHash = <TPayload extends Payload>(payload: TPayload | undefined | null, dependencies: DependencyList = []) => {
  const deps = useMemo(() => [payload, ...dependencies], [payload, dependencies])
  return usePromise(() => (payload ? PayloadHasher.hashAsync(payload) : undefined), deps)[0]
}

export const usePayloadHashes = <TPayload extends Payload>(payloads: TPayload[] | undefined | null, dependencies: DependencyList = []) => {
  const deps = useMemo(() => [payloads, ...dependencies], [payloads, dependencies])
  return usePromise(
    () =>
      payloads
        ? Promise.all(payloads.map<Promise<[TPayload, string]>>(async (payload) => [payload, await PayloadHasher.hashAsync(payload)]))
        : undefined,
    deps,
  )[0]
}
