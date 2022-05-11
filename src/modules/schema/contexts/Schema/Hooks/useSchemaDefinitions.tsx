import { useAsyncEffect } from '@xylabs/sdk-react'
import { XyoSchemaCache, XyoSchemaPayload } from '@xyo-network/sdk-xyo-client-js'
import { useState } from 'react'

import { useSchemaList } from './useSchemaList'

export const useSchemaDefinitions = (): XyoSchemaPayload[] | undefined => {
  const [schemaList] = useSchemaList()
  const [schemaPayloads, setSchemaPayloads] = useState<XyoSchemaPayload[]>()
  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (schemaList) {
        const promiseResults = await Promise.allSettled(schemaList?.map((schema) => XyoSchemaCache.instance.get(schema)))
        if (mounted()) {
          setSchemaPayloads(
            promiseResults
              .map((result) => (result.status === 'fulfilled' ? result.value?.payload : undefined))
              .filter((item) => item !== undefined && item !== null) as XyoSchemaPayload[]
          )
        }
      }
    },
    [schemaList]
  )
  return schemaPayloads
}
