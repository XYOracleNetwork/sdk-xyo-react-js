import { PayloadHasher } from '@xyo-network/core'
import { Payload } from '@xyo-network/payload-model'
import { DependencyList } from 'react'

import { usePromise } from './usePromise'

export const usePayloadHash = <TPayload extends Payload>(payload: TPayload | undefined | null, dependencies: DependencyList = []) => {
  return usePromise(() => (payload ? PayloadHasher.hashAsync(payload) : undefined), dependencies)[0]
}

export const usePayloadHashes = <TPayload extends Payload>(payloads: TPayload[] | undefined | null, dependencies: DependencyList = []) => {
  return usePromise(
    () =>
      payloads
        ? Promise.all(payloads.map<Promise<[TPayload, string]>>(async (payload) => [payload, await PayloadHasher.hashAsync(payload)]))
        : undefined,
    dependencies,
  )[0]
}
