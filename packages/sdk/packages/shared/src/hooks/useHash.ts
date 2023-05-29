import { Hasher } from '@xyo-network/core'
import { Payload } from '@xyo-network/payload-model'

import { usePromise } from './usePromise'

export const useHash = <TPayload extends Payload>(payload: TPayload | undefined | null, dependencies?: unknown[]) => {
  return usePromise(payload ? Hasher.hashAsync(payload) : undefined, [payload, ...(dependencies ?? [])])[0]
}

export const useHashes = <TPayload extends Payload>(payloads: TPayload[] | undefined | null, dependencies?: unknown[]) => {
  return usePromise(
    payloads ? Promise.all(payloads.map<Promise<[TPayload, string]>>(async (payload) => [payload, await Hasher.hashAsync(payload)])) : undefined,
    [payloads, ...(dependencies ?? [])],
  )[0]
}
