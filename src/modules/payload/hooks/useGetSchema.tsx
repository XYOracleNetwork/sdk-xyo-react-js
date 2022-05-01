import { useAsyncEffect } from '@xylabs/sdk-react'
import { Huri, XyoApiError, XyoPayload, XyoPayloadBuilder, XyoSchemaCache } from '@xyo-network/sdk-xyo-client-js'
import { AnySchema } from 'ajv'
import { useState } from 'react'

/**
 * Gets a Huri from a schema
 */
const useGetSchemaPayload = (schema?: string) => {
  const [notFound, setNotFound] = useState(false)
  const [apiError, setApiError] = useState<XyoApiError>()
  const [schemaDefinition, setSchemaDefinition] = useState<AnySchema>()
  const [schemaPayload, setSchemaPayload] = useState<XyoPayload | null | undefined>()
  const [schemaHuri, setSchemaHuri] = useState<Huri | undefined>()
  const [searchComplete, setSearchComplete] = useState(false)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (searchComplete === false && schema) {
        try {
          // check network context for uri
          const fetchedSchema = await XyoSchemaCache.instance.get(schema)

          if (mounted()) {
            if (fetchedSchema === undefined || fetchedSchema === null) {
              setNotFound(true)
            } else {
              setSchemaDefinition(schemaDefinition)

              const { huri, payload } = fetchedSchema
              const schemaPayload = new XyoPayloadBuilder(payload).fields(payload).build()

              setSchemaPayload(schemaPayload)
              setSchemaHuri(huri)
            }

            setSearchComplete(true)
          }
        } catch (e) {
          console.error(e)
          if (mounted()) {
            setApiError(e as XyoApiError)
            setSearchComplete(true)
          }
        }
      }
    },
    [apiError, schema, schemaDefinition, searchComplete]
  )

  return { apiError, notFound, schemaDefinition, schemaHuri, schemaPayload }
}

export { useGetSchemaPayload }
