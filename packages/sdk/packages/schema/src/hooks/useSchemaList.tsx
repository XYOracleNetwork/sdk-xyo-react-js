import { SchemaList, SchemaStats } from '@xyo-network/api'
import { SchemaStatsQuerySchema } from '@xyo-network/node-core-model'
import { TYPES } from '@xyo-network/node-core-types'
import { XyoPayload, XyoPayloadBuilder } from '@xyo-network/payload'
import { useNodeQueryDiviner } from '@xyo-network/react-node'
import { XyoSchemaSchema } from '@xyo-network/schema-payload-plugin'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export const useSchemaList = (archive?: string): [SchemaList[] | undefined, Error | undefined, Dispatch<SetStateAction<number>>] => {
  const [refresh, setRefresh] = useState(1)
  const refreshHistory = () => setRefresh((previous) => previous + 1)

  const [query, setQuery] = useState<XyoPayload>()
  const [schemaStats, error] = useNodeQueryDiviner(TYPES.SchemaStatsDiviner.description, query)

  const [schemaList, setSchemaList] = useState<SchemaList[]>()

  useEffect(() => {
    if (archive) {
      setQuery(new XyoPayloadBuilder({ schema: SchemaStatsQuerySchema }).fields({ archive }).build())
    }
  }, [archive, refresh])

  useEffect(() => {
    if (schemaStats) {
      const schemaStatsCounts = (schemaStats[0] as SchemaStats).counts
      setSchemaList(
        Object.keys(schemaStatsCounts).map((schema) => ({
          name: schema,
          schema: XyoSchemaSchema,
        })),
      )
    }
  }, [schemaStats])

  return [schemaList, error, refreshHistory]
}
