import { assertEx } from '@xylabs/assert'
import type { Hash } from '@xylabs/hex'
import { usePromise } from '@xylabs/react-promise'
import { PayloadBuilder } from '@xyo-network/payload-builder'
import type { Payload } from '@xyo-network/payload-model'
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
      const validJson = JSON.parse(input)
      assertEx(typeof validJson === 'object', () => 'Invalid JSON')
      const validSchema = assertEx('schema' in validJson ? validJson['schema'] : undefined, () => 'Missing schema')
      return { payload: new PayloadBuilder({ schema: validSchema }).fields(validJson).build() as TPayload }
    } catch (error) {
      return { error: error as Error }
    }
  }, [])
}
