import { useAsyncEffect } from '@xylabs/react-async-effect'
import { SchemaListPayload, SchemaListQueryPayload, SchemaListQuerySchema } from '@xyo-network/diviner-schema-list-model'
import { WithMeta } from '@xyo-network/payload-model'
import { useDivinerFromNode } from '@xyo-network/react-diviner'
import { useEffect, useMemo, useState } from 'react'

export const useSchemaList = (address?: string, nameOrAddress = 'SchemaListDiviner'): [SchemaListPayload | null | undefined, Error | undefined] => {
  const [schemaList, setSchemaList] = useState<SchemaListPayload | null>()
  const [error, setError] = useState<Error>()
  const [diviner, divinerError] = useDivinerFromNode(nameOrAddress)

  const query: SchemaListQueryPayload[] | undefined = useMemo(
    () =>
      address ?
        [
          {
            address,
            schema: SchemaListQuerySchema,
          },
        ]
      : undefined,
    [address],
  )

  useEffect(() => {
    if (diviner === null) {
      setSchemaList(null)
      setError(undefined)
    }
  }, [diviner])

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps, require-await
    async (mounted) => {
      if (diviner) {
        try {
          const response = (await diviner.divine(query)) as WithMeta<SchemaListPayload>[]
          if (mounted()) {
            setSchemaList(response?.[0])
            setError(undefined)
          }
        } catch (e) {
          setError(e as Error)
          setSchemaList(undefined)
        }
      }
    },
    [diviner, divinerError, query],
  )
  return [schemaList, error]
}
