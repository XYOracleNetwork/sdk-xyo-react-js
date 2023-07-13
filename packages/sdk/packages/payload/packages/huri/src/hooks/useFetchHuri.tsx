import { usePromise } from '@xylabs/react-promise'
import { DivinerInstance, HuriPayload, HuriSchema } from '@xyo-network/diviner'
import { useMemo } from 'react'

import { useBuildHuri } from './useBuildHuri'

export const useFetchHuri = (hashOrHuri?: string, diviner?: DivinerInstance, token?: string) => {
  const huri = useBuildHuri(hashOrHuri) ?? hashOrHuri
  const huriPayload: HuriPayload | undefined = useMemo(
    () => (huri ? { huri: [huri], schema: HuriSchema, tokens: token ? [token] : undefined } : undefined),
    [huri, token],
  )

  return usePromise(async () => (diviner && huriPayload ? await diviner.divine([huriPayload]) : undefined), [diviner, huriPayload])
}
