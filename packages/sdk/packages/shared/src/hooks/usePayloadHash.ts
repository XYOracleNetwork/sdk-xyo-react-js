import { usePromise } from '@xylabs/react-promise'
import { PayloadHasher } from '@xyo-network/hash'
import { Payload } from '@xyo-network/payload-model'

export const usePayloadHash = <TPayload extends Payload>(payload: TPayload | undefined | null) => {
  return usePromise(async () => (payload ? await PayloadHasher.hashAsync(payload) : undefined), [payload])[0]
}

export const usePayloadHashes = <TPayload extends Payload>(payloads: TPayload[] | undefined | null) => {
  return usePromise(
    async () =>
      payloads
        ? await Promise.all(payloads.map<Promise<[TPayload, string]>>(async (payload) => [payload, await PayloadHasher.hashAsync(payload)]))
        : undefined,
    [payloads],
  )[0]
}
