import { PayloadHasher } from '@xyo-network/core'
import { Payload } from '@xyo-network/payload-model'

import { usePromise } from './usePromise'

export const usePayloadHash = <TPayload extends Payload>(payload: TPayload | undefined | null, dependencies?: unknown[]) => {
  return usePromise(payload ? PayloadHasher.hashAsync(payload) : undefined, [payload, ...(dependencies ?? [])])[0]
}

export const usePayloadHashes = <TPayload extends Payload>(payloads: TPayload[] | undefined | null, dependencies?: unknown[]) => {
  return usePromise(
    payloads
      ? Promise.all(payloads.map<Promise<[TPayload, string]>>(async (payload) => [payload, await PayloadHasher.hashAsync(payload)]))
      : undefined,
    [payloads, ...(dependencies ?? [])],
  )[0]
}
