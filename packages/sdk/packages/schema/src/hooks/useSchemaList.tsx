import type { Address } from '@xylabs/hex'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import type { SchemaListPayload, SchemaListQueryPayload } from '@xyo-network/diviner-schema-list-model'
import { SchemaListQuerySchema } from '@xyo-network/diviner-schema-list-model'
import type { WithMeta } from '@xyo-network/payload-model'
import { useWeakDivinerFromNode } from '@xyo-network/react-diviner'
import { useEffect, useMemo, useState } from 'react'

export const useSchemaList = (address?: Address, nameOrAddress = 'SchemaListDiviner'): [SchemaListPayload | null | undefined, Error | undefined] => {
  const [schemaList, setSchemaList] = useState<SchemaListPayload | null>()
  const [error, setError] = useState<Error>()
  const [diviner, divinerError] = useWeakDivinerFromNode(nameOrAddress)

  const query: SchemaListQueryPayload[] | undefined = useMemo(
    () =>
      address
        ? [
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
    async (mounted) => {
      const divinerInstance = diviner?.deref()
      if (divinerInstance) {
        try {
          const response = (await divinerInstance.divine(query)) as WithMeta<SchemaListPayload>[]
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
