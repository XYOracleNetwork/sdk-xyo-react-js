import { useAsyncEffect } from '@xylabs/react-shared'
import { DivinerWrapper, XyoHuriPayload, XyoHuriSchema } from '@xyo-network/diviner'
import { XyoPayload } from '@xyo-network/payload-model'
import { useContextEx } from '@xyo-network/react-shared'
import compact from 'lodash/compact'
import { Dispatch, useEffect, useState } from 'react'

import { PayloadDivinerContext } from './Context'

export const usePayloadDiviner = (required = false) => {
  return useContextEx(PayloadDivinerContext, 'PayloadDiviner', required)
}

export const useDivinePayload = <T extends XyoPayload = XyoPayload>(
  huri?: string,
): [T | undefined | null, Dispatch<T | null | undefined>, Error | undefined] => {
  const { diviner } = usePayloadDiviner()
  const [payload, setPayload] = useState<T | null>()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    if (diviner) {
      setPayload(undefined)
    }
  }, [diviner])

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (huri && diviner && payload === undefined) {
        try {
          const huriPayload: XyoHuriPayload = { huri: [huri], schema: XyoHuriSchema }
          const wrapper = diviner ? DivinerWrapper.wrap(diviner) : undefined
          const [payload] = (await wrapper?.divine([huriPayload])) ?? []
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

export const useDivinePayloads = <T extends XyoPayload = XyoPayload>(
  huriList: string[],
): [(T | null)[] | undefined, Dispatch<(T | null)[] | undefined>, Error[] | undefined] => {
  const { diviner } = usePayloadDiviner()
  const [payloads, setPayloads] = useState<(T | null)[]>()
  const [errors, setErrors] = useState<Error[]>()

  useEffect(() => {
    if (diviner) {
      setPayloads(undefined)
    }
  }, [diviner])

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      console.log(`huriList: ${JSON.stringify(huriList, null, 2)}`)
      const payloads = await Promise.allSettled(
        huriList.map(async (huri) => {
          const huriPayload: XyoHuriPayload = { huri: [huri], schema: XyoHuriSchema }
          const wrapper = diviner ? DivinerWrapper.wrap(diviner) : undefined
          const [payload] = (await wrapper?.divine([huriPayload])) ?? []
          return payload
        }),
      )
      if (mounted()) {
        setPayloads([...payloads.values()].map((value) => (value.status === 'rejected' ? null : value.value)) as (T | null)[])
        setErrors(
          compact([...payloads.values()].map((value) => (value.status === 'rejected' ? Error('divine failed', { cause: value.reason }) : undefined))),
        )
        if (mounted()) {
          setPayloads([...payloads.values()].map((value) => (value.status === 'rejected' ? null : value.value)) as (T | null)[])
          setErrors(
            compact(
              [...payloads.values()].map((value) => (value.status === 'rejected' ? Error('divine failed', { cause: value.reason }) : undefined)),
            ),
          )
        }
      }
    },
    [diviner, huriList, payloads],
  )

  return [payloads, setPayloads, errors]
}
