import { useAsyncEffect } from '@xylabs/react-async-effect'
import { PayloadBuilder } from '@xyo-network/payload-builder'
import { ModuleError, ModuleErrorSchema } from '@xyo-network/payload-model'
import { SchemaCache, SchemaCacheEntry } from '@xyo-network/schema-cache'
import { SchemaPayload } from '@xyo-network/schema-payload-plugin'
import { useState } from 'react'

/**
 * Gets a Huri and schema payload from a schema string
 */
const useGetSchemaPayload = (schema?: string) => {
  const [notFound, setNotFound] = useState(false)
  const [xyoError, setError] = useState<ModuleError>()
  const [schemaCacheEntry, setSchemaCacheEntry] = useState<SchemaCacheEntry | null | undefined>()
  const [schemaLocal, setSchemaLocal] = useState<string>()

  useAsyncEffect(
    async (mounted) => {
      const firstRequest = !notFound && !schemaCacheEntry && !xyoError
      const schemaChanged = schema !== schemaLocal

      if ((schema && firstRequest) || (schema && schemaChanged)) {
        try {
          const schemaCacheEntry = await SchemaCache.instance.get(schema)
          if (mounted()) {
            setSchemaCacheEntry(schemaCacheEntry)
            setNotFound(schemaCacheEntry === null || schemaCacheEntry === undefined)
          }
        } catch (e) {
          const error = e as Error
          console.error(e)
          if (mounted()) {
            setError({ message: error.message, schema: ModuleErrorSchema, sources: [] })
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
    schemaPayload:
      schemaCacheEntry ? new PayloadBuilder<SchemaPayload>(schemaCacheEntry?.payload).fields(schemaCacheEntry.payload).build() : schemaCacheEntry,
    xyoError,
  }
}

export { useGetSchemaPayload }
