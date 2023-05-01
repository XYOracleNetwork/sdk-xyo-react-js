import { useAsyncEffect } from '@xylabs/react-async-effect'
import { AccountInstance } from '@xyo-network/account-model'
import { SchemaListPayload, SchemaListQueryPayload, SchemaListQuerySchema } from '@xyo-network/diviner-schema-list-model'
import { useDiviner } from '@xyo-network/react-diviner'
import { useMemo, useState } from 'react'

export const useSchemaList = (
  address?: string,
  nameOrAddress = 'SchemaListDiviner',
  account?: AccountInstance,
): [SchemaListPayload | undefined, Error | undefined] => {
  const [schemaList, setSchemaList] = useState<SchemaListPayload>()
  const [error, setError] = useState<Error>()
  const [diviner, divinerError] = useDiviner(nameOrAddress, account)

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

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps, require-await
    async (mounted) => {
      if (diviner) {
        try {
          const response = (await diviner.divine(query)) as SchemaListPayload[]
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
