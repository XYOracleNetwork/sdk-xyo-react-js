import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoPayloadDivinerQueryPayloadSchema } from '@xyo-network/diviner'
import { XyoPayload } from '@xyo-network/payload'
import { useContextEx } from '@xyo-network/react-shared'
import compact from 'lodash/compact'
import { useState } from 'react'

import { PayloadDivinerContext } from './Context'

export const usePayloadDiviner = (required = false) => {
  return useContextEx(PayloadDivinerContext, 'PayloadDiviner', required)
}

export const useDivinePayload = (huri?: string): [XyoPayload | undefined | null, Error | undefined] => {
  const { diviner } = usePayloadDiviner()
  const [payload, setPayload] = useState<XyoPayload | null>()
  const [error, setError] = useState<Error>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (huri) {
        try {
          const [, payloads] = (await diviner?.query({ huri, schema: XyoPayloadDivinerQueryPayloadSchema })) ?? []
          if (mounted()) {
            setPayload(compact(payloads)[0])
          }
        } catch (ex) {
          if (mounted()) {
            setError(ex as Error)
          }
        }
      }
    },
    [diviner, huri],
  )

  return [payload, error]
}

export const useDivinePayloads = (huriList: string[]): [(XyoPayload | null)[] | undefined, Error[] | undefined] => {
  const { diviner } = usePayloadDiviner()
  const [payloads, setPayloads] = useState<(XyoPayload | null)[]>()
  const [errors, setErrors] = useState<Error[]>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      console.log(`huriList: ${JSON.stringify(huriList, null, 2)}`)
      const payloads = await Promise.allSettled(
        huriList.map(async (huri) => {
          const [, payloads] = (await diviner?.query({ huri, schema: XyoPayloadDivinerQueryPayloadSchema })) ?? []
          return compact(payloads)[0]
        }),
      )
      if (mounted()) {
        setPayloads([...payloads.values()].map((value) => (value.status === 'rejected' ? null : value.value)))
        setErrors(
          compact([...payloads.values()].map((value) => (value.status === 'rejected' ? Error('fivine failed', { cause: value.reason }) : undefined))),
        )
      }
    },
    [diviner, huriList],
  )

  console.log(`payloads: ${JSON.stringify(payloads, null, 2)}`)

  return [payloads, errors]
}
