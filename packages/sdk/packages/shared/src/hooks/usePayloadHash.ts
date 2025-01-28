import { assertEx } from '@xylabs/assert'
import type { Hash } from '@xylabs/hex'
import { usePromise } from '@xylabs/react-promise'
import { PayloadBuilder } from '@xyo-network/payload-builder'
import { isAnyPayload, type Payload } from '@xyo-network/payload-model'
import { useMemo } from 'react'

export const usePayloadHash = <TPayload extends Payload>(payload: TPayload | undefined | null) => {
  return usePromise(async () => (payload ? await PayloadBuilder.dataHash(payload) : undefined), [payload])[0]
}

export const usePayloadRootHash = <TPayload extends Payload>(payload: TPayload | undefined | null) => {
  return usePromise(async () => (payload ? await PayloadBuilder.hash(payload) : undefined), [payload])[0]
}

export const usePayloadHashes = <TPayload extends Payload>(payloads: TPayload[] | undefined | null) => {
  return usePromise(
    async () =>
      payloads
        ? await Promise.all(payloads.map<Promise<[TPayload, Hash]>>(async payload => [payload, await PayloadBuilder.dataHash(payload)]))
        : undefined,
    [payloads],
  )[0]
}

export type ValidatedResponse = { error?: Error; payload?: Payload }

export const useValidatedPayload = <TPayload extends Payload>(input?: string): ValidatedResponse => {
  return useMemo(() => {
    if (!input) return {}
    try {
      const object = JSON.parse(input)
      const validPayload = assertEx(isAnyPayload(object) ? object : null, () => 'Invalid payload')
      const { schema, ...fields } = validPayload
      return { payload: new PayloadBuilder({ schema }).fields(fields).build() as TPayload }
    } catch (error) {
      return { error: error as Error }
    }
  }, [input])
}
