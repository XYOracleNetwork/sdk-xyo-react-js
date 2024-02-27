import { Hash } from '@xylabs/hex'
import { usePromise } from '@xylabs/react-promise'
import { PayloadBuilder } from '@xyo-network/payload-builder'
import { Payload } from '@xyo-network/payload-model'

export const usePayloadHash = <TPayload extends Payload>(payload: TPayload | undefined | null) => {
  return usePromise(async () => (payload ? await PayloadBuilder.dataHash(payload) : undefined), [payload])[0]
}

export const usePayloadHashes = <TPayload extends Payload>(payloads: TPayload[] | undefined | null) => {
  return usePromise(
    async () =>
      payloads ?
        await Promise.all(payloads.map<Promise<[TPayload, Hash]>>(async (payload) => [payload, await PayloadBuilder.dataHash(payload)]))
      : undefined,
    [payloads],
  )[0]
}
