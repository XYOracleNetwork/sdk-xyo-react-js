import { DivinerWrapper, HuriPayload, HuriSchema } from '@xyo-network/diviner'
import { usePromise } from '@xyo-network/react-shared'
import { useMemo } from 'react'

import { useBuildHuri } from './useBuildHuri'

export const useFetchHuri = (hashOrHuri?: string, diviner?: DivinerWrapper, token?: string) => {
  const huri = useBuildHuri(hashOrHuri) ?? hashOrHuri
  const huriPayload: HuriPayload | undefined = useMemo(
    () => (huri ? { huri: [huri], schema: HuriSchema, tokens: token ? [token] : undefined } : undefined),
    [huri, token],
  )

  const divinerReq = useMemo(() => (diviner && huriPayload ? diviner.divine([huriPayload]) : undefined), [diviner, huriPayload])

  const [payload, error] = usePromise(() => divinerReq, [divinerReq])

  return [payload, error]
}
