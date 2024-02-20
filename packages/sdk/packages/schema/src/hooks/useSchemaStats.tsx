import { Address } from '@xylabs/hex'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import {
  SchemaStatsDivinerSchema,
  SchemaStatsPayload,
  SchemaStatsQueryPayload,
  SchemaStatsQuerySchema,
} from '@xyo-network/diviner-schema-stats-model'
import { TYPES } from '@xyo-network/node-core-types'
import { isPayloadOfSchemaTypeWithMeta, WithMeta, WithSources } from '@xyo-network/payload-model'
import { useDivinerFromNode } from '@xyo-network/react-diviner'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'

export const useSchemaStats = (
  statsAddress?: Address,
  nameOrAddress = TYPES.SchemaStatsDiviner,
): [SchemaStatsPayload[] | undefined, Error | undefined, Dispatch<SetStateAction<number>>] => {
  const [refresh, setRefresh] = useState(1)
  const [diviner, divinerError] = useDivinerFromNode(nameOrAddress)
  const [error, setError] = useState<Error>()
  const refreshHistory = () => setRefresh((previous) => previous + 1)

  const [schemaList, setSchemaList] = useState<WithSources<WithMeta<SchemaStatsPayload>>[]>()

  const query: SchemaStatsQueryPayload = useMemo(
    () => ({
      address: statsAddress,
      schema: SchemaStatsQuerySchema,
    }),
    [statsAddress],
  )

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (diviner) {
        if (divinerError) {
          if (mounted()) {
            setError(divinerError)
            setSchemaList(undefined)
          }
        } else {
          try {
            const schemas = (await diviner.divine([query])).filter(isPayloadOfSchemaTypeWithMeta(SchemaStatsDivinerSchema)) as WithSources<
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
