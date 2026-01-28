import { usePromise } from '@xylabs/react-promise'
import type { Address } from '@xylabs/sdk-js'
import type { SchemaListPayload, SchemaListQueryPayload } from '@xyo-network/diviner-schema-list-model'
import { SchemaListQuerySchema } from '@xyo-network/diviner-schema-list-model'
import { useWeakDivinerFromNode } from '@xyo-network/react-diviner'
import { useMemo } from 'react'

export const useSchemaList = (address?: Address, nameOrAddress = 'SchemaListDiviner'): [SchemaListPayload | null | undefined, Error | undefined] => {
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

  const [schemaList, error] = usePromise(
    async () => {
      const divinerInstance = diviner?.deref()
      if (divinerInstance) {
        const response = (await divinerInstance.divine(query)) as SchemaListPayload[]
        return response.at(0)
      }
    },
    [diviner, divinerError, query],
  )
  return [schemaList, error]
}
