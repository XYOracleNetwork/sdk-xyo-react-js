import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoApiError } from '@xyo-network/api'
import { XyoPayloadBuilder, XyoSchemaPayload } from '@xyo-network/payload'
import { XyoSchemaCache, XyoSchemaCacheEntry } from '@xyo-network/utils'
import { useState } from 'react'

/**
 * Gets a Huri and schema payload from a schema string
 */
const useGetSchemaPayload = (schema?: string) => {
  const [notFound, setNotFound] = useState(false)
  const [apiError, setApiError] = useState<XyoApiError>()
  const [schemaCacheEntry, setSchemaCacheEntry] = useState<XyoSchemaCacheEntry | null | undefined>()
  const [schemaLocal, setSchemaLocal] = useState<string>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const firstRequest = !notFound && !schemaCacheEntry && !apiError
      const schemaChanged = schema !== schemaLocal

      if ((schema && firstRequest) || (schema && schemaChanged)) {
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
      if (schemaChanged) {
        setSchemaLocal(schema)
      }
    },
    [apiError, notFound, schema, schemaLocal, schemaCacheEntry]
  )

  return {
    apiError,
    notFound,
    schemaHuri: schemaCacheEntry?.huri,
    schemaPayload: schemaCacheEntry ? new XyoPayloadBuilder<XyoSchemaPayload>(schemaCacheEntry?.payload).fields(schemaCacheEntry.payload).build() : schemaCacheEntry,
  }
}

export { useGetSchemaPayload }
