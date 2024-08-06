import { useAsyncEffect } from '@xylabs/react-async-effect'
import { SchemaCache } from '@xyo-network/schema-cache'
import { SchemaPayload } from '@xyo-network/schema-payload-plugin'
import { useState } from 'react'

export type SchemaList = { name: string }

export const useSchemaDefinitions = (schemaList?: SchemaList[]): SchemaPayload[] | undefined => {
  const [schemaPayloads, setSchemaPayloads] = useState<SchemaPayload[]>()
  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (schemaList) {
        const promiseResults = await Promise.allSettled(schemaList?.map(({ name }) => SchemaCache.instance.get(name)))
        if (mounted()) {
          setSchemaPayloads(
            promiseResults
              .map(result => (result.status === 'fulfilled' ? result.value?.payload : undefined))
              .filter(item => item !== undefined && item !== null) as SchemaPayload[],
          )
        }
      }
    },
    [schemaList],
  )
  return schemaPayloads
}
