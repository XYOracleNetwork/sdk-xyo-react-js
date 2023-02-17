import { useAsyncEffect } from '@xylabs/react-shared'
import { useArchive } from '@xyo-network/react-api'
import { useSchemaList } from '@xyo-network/react-schema'
import { XyoSchemaPayload } from '@xyo-network/schema-payload-plugin'
import { XyoSchemaCache } from '@xyo-network/utils'
import { useState } from 'react'

/** @deprecated - moved to @xyo-network/react-schema package */
export const useSchemaDefinitions = (): XyoSchemaPayload[] | undefined => {
  const { archive } = useArchive()
  const [schemaList] = useSchemaList(archive)
  const [schemaPayloads, setSchemaPayloads] = useState<XyoSchemaPayload[]>()
  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (schemaList) {
        const promiseResults = await Promise.allSettled(schemaList?.map(({ name }) => XyoSchemaCache.instance.get(name)))
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
