import { useAsyncEffect } from '@xylabs/sdk-react'
import { XyoApiError, XyoPayloadBuilder, XyoSchemaCache, XyoSchemaCacheEntry } from '@xyo-network/sdk-xyo-client-js'
import { useState } from 'react'

/**
 * Gets a Huri and schema payload from a schema string
 */
const useGetSchemaPayload = (schema?: string) => {
  const [notFound, setNotFound] = useState(false)
  const [apiError, setApiError] = useState<XyoApiError>()
  const [schemaCacheEntry, setSchemaCacheEntry] = useState<XyoSchemaCacheEntry | null | undefined>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (schema && !notFound && !schemaCacheEntry) {
        try {
          const schemaCacheEntry = await XyoSchemaCache.instance.get(schema)
          if (mounted()) {
            setSchemaCacheEntry(schemaCacheEntry)
            setNotFound(schemaCacheEntry === null || schemaCacheEntry === undefined)
          }
        } catch (e) {
          console.error(e)
          if (mounted()) {
            setApiError(e as XyoApiError)
          }
        }
      }
    },
    [apiError, notFound, schema, schemaCacheEntry]
  )

  return {
    apiError,
    notFound,
    schemaHuri: schemaCacheEntry?.huri,
    schemaPayload: schemaCacheEntry ? new XyoPayloadBuilder(schemaCacheEntry?.payload).build() : schemaCacheEntry,
  }
}

export { useGetSchemaPayload }
