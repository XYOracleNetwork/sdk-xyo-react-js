import { useAsyncEffect } from '@xylabs/react-shared'
import { SchemaStatsPayload, SchemaStatsQueryPayload, SchemaStatsQuerySchema } from '@xyo-network/node-core-model'
import { TYPES } from '@xyo-network/node-core-types'
import { useDiviner } from '@xyo-network/react-diviner'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'

export const useSchemaStats = (
  statsAddress?: string,
  nameOrAddress = TYPES.SchemaStatsDiviner.description,
): [SchemaStatsPayload[] | undefined, Error | undefined, Dispatch<SetStateAction<number>>] => {
  const [refresh, setRefresh] = useState(1)
  const [diviner, divinerError] = useDiviner(nameOrAddress)
  const [error, setError] = useState<Error>()
  const refreshHistory = () => setRefresh((previous) => previous + 1)

  const [schemaList, setSchemaList] = useState<SchemaStatsPayload[]>()

  const query: SchemaStatsQueryPayload = useMemo(
    () => ({
      schema: SchemaStatsQuerySchema,
      statsAddress,
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
            const schemas = (await diviner.divine([query])) as SchemaStatsPayload[]
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
