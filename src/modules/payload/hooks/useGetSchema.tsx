import { useAsyncEffect } from '@xylabs/sdk-react'
import { Huri, XyoApiError, XyoPayload, XyoPayloadBuilder, XyoSchemaCache, XyoSchemaCacheEntry } from '@xyo-network/sdk-xyo-client-js'
import { useEffect, useState } from 'react'

/**
 * Gets a Huri and schema payload from a schema string
 */
const useGetSchemaPayload = (schema?: string) => {
  const [notFound, setNotFound] = useState(false)
  const [apiError, setApiError] = useState<XyoApiError>()
  const [schemaCacheEntry, setSchemaCacheEntry] = useState<XyoSchemaCacheEntry>()
  const [schemaPayload, setSchemaPayload] = useState<XyoPayload | null | undefined>()
  const [schemaHuri, setSchemaHuri] = useState<Huri | undefined>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (schema && !notFound && !schemaCacheEntry) {
        try {
          const schemaCacheEntry = await XyoSchemaCache.instance.get(schema)

          if (mounted()) {
            if (schemaCacheEntry === undefined || schemaCacheEntry === null) {
              setNotFound(true)
            } else {
              setSchemaCacheEntry(schemaCacheEntry)
            }
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

  useEffect(() => {
    if (schemaCacheEntry) {
      const { huri, payload } = schemaCacheEntry
      const schemaPayload = new XyoPayloadBuilder(payload).fields(payload).build()

      setSchemaPayload(schemaPayload)
      setSchemaHuri(huri)
    }
  }, [schemaCacheEntry])

  return { apiError, notFound, schemaHuri, schemaPayload }
}

export { useGetSchemaPayload }
