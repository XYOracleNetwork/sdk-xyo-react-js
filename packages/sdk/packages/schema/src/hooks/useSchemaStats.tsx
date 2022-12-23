import { SchemaStats } from '@xyo-network/api'
import { SchemaStatsQuerySchema } from '@xyo-network/node-core-model'
import { TYPES } from '@xyo-network/node-core-types'
import { XyoPayload, XyoPayloadBuilder } from '@xyo-network/payload'
import { useNodeQueryDiviner } from '@xyo-network/react-node'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export const useSchemaStats = (archive?: string): [SchemaStats | undefined, Error | undefined, Dispatch<SetStateAction<number>>] => {
  const [refresh, setRefresh] = useState(1)
  const refreshHistory = () => setRefresh((previous) => previous + 1)

  const [query, setQuery] = useState<XyoPayload>()
  const [schemaStats, error] = useNodeQueryDiviner(TYPES.SchemaStatsDiviner.description, query)

  useEffect(() => {
    if (archive) {
      setQuery(new XyoPayloadBuilder({ schema: SchemaStatsQuerySchema }).fields({ archive }).build())
    }
  }, [archive, refresh])

  return [schemaStats?.[0] as SchemaStats, error, refreshHistory]
}
