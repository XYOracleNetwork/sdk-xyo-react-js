import { DivinerWrapper, XyoHuriPayload, XyoHuriSchema } from '@xyo-network/diviner'
import { usePromise } from '@xyo-network/react-shared'
import { useMemo } from 'react'

import { useBuildHuri } from './useBuildHuri'

export const useFetchHuri = (hashOrHuri?: string, diviner?: DivinerWrapper) => {
  const huri = useBuildHuri(hashOrHuri)
  const huriPayload: XyoHuriPayload | undefined = useMemo(() => (huri ? { huri: [huri], schema: XyoHuriSchema } : undefined), [huri])

  const divinerReq = useMemo(() => (diviner && huriPayload ? diviner.divine([huriPayload]) : undefined), [diviner, huriPayload])

  const [payload, error] = usePromise(divinerReq, [divinerReq])

  return [payload, error]
}
