import { useAsyncEffect } from '@xylabs/react-shared'
import { SchemaCache } from '@xyo-network/schema-cache'
import { XyoSchemaPayload } from '@xyo-network/schema-payload-plugin'
import { useState } from 'react'

export type SchemaList = { name: string }

export const useSchemaDefinitions = (schemaList?: SchemaList[]): XyoSchemaPayload[] | undefined => {
  const [schemaPayloads, setSchemaPayloads] = useState<XyoSchemaPayload[]>()
  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (schemaList) {
        const promiseResults = await Promise.allSettled(schemaList?.map(({ name }) => SchemaCache.instance.get(name)))
        if (mounted()) {
          setSchemaPayloads(
            promiseResults
              .map((result) => (result.status === 'fulfilled' ? result.value?.payload : undefined))
              .filter((item) => item !== undefined && item !== null) as XyoSchemaPayload[],
          )
        }
      }
    },
    [schemaList],
  )
  return schemaPayloads
}
