/* eslint-disable import/no-deprecated */
/* eslint-disable deprecation/deprecation */
import { useAsyncEffect } from '@xylabs/react-shared'
import { SchemaList } from '@xyo-network/api'
import { DivinerWrapper } from '@xyo-network/diviner'
import { useState } from 'react'

import { useSchemaListApiDiviner } from './use'

/** @deprecated - get stats from querying the module on the node directly */
export const useDivineSchemaList = (): [SchemaList[] | undefined, Error | undefined, () => void] => {
  const [list, setList] = useState<SchemaList[]>()
  const [error, setError] = useState<Error>()
  const { diviner } = useSchemaListApiDiviner()
  const [refresh, setRefresh] = useState(1)

  const refreshList = () => setRefresh((previous) => previous + 1)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (diviner) {
        try {
          const result = (await new DivinerWrapper(diviner).divine()) as SchemaList[]
          if (mounted()) {
            setList(result)
          }
        } catch (e) {
          setError(e as Error)
        }
      }
    },
    [diviner, refresh],
  )

  return [list, error, refreshList]
}
