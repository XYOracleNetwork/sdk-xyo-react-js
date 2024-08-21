import type { Address } from '@xylabs/hex'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import type {
  SchemaStatsPayload,
  SchemaStatsQueryPayload,
} from '@xyo-network/diviner-schema-stats-model'
import {
  SchemaStatsDivinerSchema,
  SchemaStatsQuerySchema,
} from '@xyo-network/diviner-schema-stats-model'
import { TYPES } from '@xyo-network/node-core-types'
import type { WithMeta, WithSources } from '@xyo-network/payload-model'
import { isPayloadOfSchemaTypeWithMeta } from '@xyo-network/payload-model'
import { useWeakDivinerFromNode } from '@xyo-network/react-diviner'
import type { Dispatch, SetStateAction } from 'react'
import { useMemo, useState } from 'react'

export const useSchemaStats = (
  statsAddress?: Address,
  nameOrAddress = TYPES.SchemaStatsDiviner,
): [SchemaStatsPayload[] | undefined, Error | undefined, Dispatch<SetStateAction<number>>] => {
  const [refresh, setRefresh] = useState(1)
  const [diviner, divinerError] = useWeakDivinerFromNode(nameOrAddress)
  const [error, setError] = useState<Error>()
  const refreshHistory = () => setRefresh(previous => previous + 1)

  const [schemaList, setSchemaList] = useState<WithSources<WithMeta<SchemaStatsPayload>>[]>()

  const query: SchemaStatsQueryPayload = useMemo(
    () => ({
      address: statsAddress,
      schema: SchemaStatsQuerySchema,
    }),
    [statsAddress],
  )

  useAsyncEffect(
    async (mounted) => {
      const instance = diviner?.deref()
      if (instance) {
        if (divinerError) {
          if (mounted()) {
            setError(divinerError)
            setSchemaList(undefined)
          }
        } else {
          try {
            const schemas = (await instance.divine([query])).filter(isPayloadOfSchemaTypeWithMeta(SchemaStatsDivinerSchema)) as WithSources<
              WithMeta<SchemaStatsPayload>
            >[]
            if (mounted()) {
              setSchemaList(schemas)
              setError(undefined)
            }
          } catch (ex) {
            setError(ex as Error)
            setSchemaList(undefined)
          }
        }
      }
    },
    [diviner, refresh, divinerError, query],
  )

  return [schemaList, error, refreshHistory]
}
