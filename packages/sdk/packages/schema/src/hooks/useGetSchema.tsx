import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoError, XyoErrorSchema } from '@xyo-network/module'
import { XyoPayloadBuilder } from '@xyo-network/payload-builder'
import { XyoSchemaPayload } from '@xyo-network/schema-payload-plugin'
import { XyoSchemaCache, XyoSchemaCacheEntry } from '@xyo-network/utils'
import { useState } from 'react'

/**
 * Gets a Huri and schema payload from a schema string
 */
const useGetSchemaPayload = (schema?: string) => {
  const [notFound, setNotFound] = useState(false)
  const [xyoError, setXyoError] = useState<XyoError>()
  const [schemaCacheEntry, setSchemaCacheEntry] = useState<XyoSchemaCacheEntry | null | undefined>()
  const [schemaLocal, setSchemaLocal] = useState<string>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const firstRequest = !notFound && !schemaCacheEntry && !xyoError
      const schemaChanged = schema !== schemaLocal

      if ((schema && firstRequest) || (schema && schemaChanged)) {
        try {
          const schemaCacheEntry = await XyoSchemaCache.instance.get(schema)
          if (mounted()) {
            setSchemaCacheEntry(schemaCacheEntry)
            setNotFound(schemaCacheEntry === null || schemaCacheEntry === undefined)
          }
        } catch (e) {
          const error = e as Error
          console.error(e)
          if (mounted()) {
            setXyoError({ message: error.message, schema: XyoErrorSchema, sources: [] })
          }
        }
      }
      if (schemaChanged) {
        setSchemaLocal(schema)
      }
    },
    [xyoError, notFound, schema, schemaLocal, schemaCacheEntry],
  )

  return {
    notFound,
    schemaHuri: schemaCacheEntry?.huri,
    schemaPayload: schemaCacheEntry
      ? new XyoPayloadBuilder<XyoSchemaPayload>(schemaCacheEntry?.payload).fields(schemaCacheEntry.payload).build()
      : schemaCacheEntry,
    xyoError,
  }
}

export { useGetSchemaPayload }
