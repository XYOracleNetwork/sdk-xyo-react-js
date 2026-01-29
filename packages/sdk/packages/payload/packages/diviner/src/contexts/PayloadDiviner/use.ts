import { useAsyncEffect } from '@xylabs/react-async-effect'
import { useContextEx } from '@xylabs/react-shared'
import { exists } from '@xylabs/sdk-js'
import type { HuriPayload } from '@xyo-network/diviner-huri'
import { HuriSchema } from '@xyo-network/diviner-huri'
import type { Payload } from '@xyo-network/payload-model'
import type { Dispatch } from 'react'
import { useEffect, useState } from 'react'

import { PayloadDivinerContext } from './Context.ts'

export const usePayloadDiviner = (required = false) => {
  return useContextEx(PayloadDivinerContext, 'PayloadDiviner', required)
}

export const useDivinePayload = <T extends Payload = Payload>(
  huri?: string,
): [T | undefined | null, Dispatch<T | null | undefined>, Error | undefined] => {
  const { diviner } = usePayloadDiviner()
  const [payload, setPayload] = useState<T | null>()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    // we do this to clear the payload when the diviner changes
    if (diviner) {
      setPayload(undefined)
    }
  }, [diviner])

  useAsyncEffect(
    async (mounted) => {
      if (huri && diviner && payload === undefined) {
        try {
          const huriPayload: HuriPayload = { huri: [huri], schema: HuriSchema }
          const [payload] = (await diviner?.divine([huriPayload])) ?? []
          if (mounted()) {
            setPayload(payload ? (payload as T) : null)
          }
        } catch (ex) {
          if (mounted()) {
            setError(ex as Error)
          }
        }
      }
    },
    [diviner, huri, payload],
  )

  return [payload, setPayload, error]
}

export const useDivinePayloads = <T extends Payload = Payload>(
  huriList: string[],
): [(T | null)[] | undefined, Dispatch<(T | null)[] | undefined>, Error[] | undefined] => {
  const { diviner } = usePayloadDiviner()
  const [payloads, setPayloads] = useState<(T | null)[]>()
  const [errors, setErrors] = useState<Error[]>()

  useEffect(() => {
    if (diviner) {
      // clear payloads when diviner changes
      setPayloads(undefined)
    }
  }, [diviner])

  useAsyncEffect(
    async (mounted) => {
      console.log(`huriList: ${JSON.stringify(huriList, null, 2)}`)
      const payloads = await Promise.allSettled(
        huriList.map(async (huri) => {
          const huriPayload: HuriPayload = { huri: [huri], schema: HuriSchema }
          const [payload] = (await diviner?.divine([huriPayload])) ?? []
          return payload
        }),
      )
      if (mounted()) {
        setPayloads([...payloads.values()].map(value => (value.status === 'rejected' ? null : value.value)) as (T | null)[])
        setErrors(
          (
            [...payloads.values()].map(value => (value.status === 'rejected' ? new Error('divine failed', { cause: value.reason }) : undefined))
          ).filter(exists),
        )
        if (mounted()) {
          setPayloads([...payloads.values()].map(value => (value.status === 'rejected' ? null : value.value)) as (T | null)[])
          setErrors(
            (
              [...payloads.values()].map(value => (value.status === 'rejected' ? new Error('divine failed', { cause: value.reason }) : undefined))
            ).filter(exists),
          )
        }
      }
    },
    [diviner, huriList, payloads],
  )

  return [payloads, setPayloads, errors]
}
