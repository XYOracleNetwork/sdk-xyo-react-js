import { usePromise } from '@xylabs/react-promise'
import type { HuriPayload } from '@xyo-network/diviner-huri'
import { HuriSchema } from '@xyo-network/diviner-huri'
import type { DivinerInstance } from '@xyo-network/diviner-model'
import { useMemo } from 'react'

import { useBuildHuri } from './useBuildHuri.tsx'

export const useFetchHuri = (hashOrHuri?: string, diviner?: DivinerInstance, token?: string) => {
  const huri = useBuildHuri(hashOrHuri) ?? hashOrHuri
  const huriPayload: HuriPayload | undefined = useMemo(
    () => (huri ? { huri: [huri], schema: HuriSchema, tokens: token ? [token] : undefined } : undefined),
    [huri, token],
  )

  return usePromise(async () => (diviner && huriPayload ? await diviner.divine([huriPayload]) : undefined), [diviner, huriPayload])
}
