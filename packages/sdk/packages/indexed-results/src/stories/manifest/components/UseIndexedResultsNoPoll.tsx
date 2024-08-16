import type { Hash } from '@xylabs/hex'
import { FlexCol } from '@xylabs/react-flexbox'
import { PayloadDivinerQuerySchema } from '@xyo-network/diviner-payload-model'
import type { Payload } from '@xyo-network/payload-model'
import { useWeakArchivistFromNode } from '@xyo-network/react-archivist'
import React, { useMemo } from 'react'

import type { UseIndexedResultsConfig } from '../../../hooks/index.ts'
import { useIndexedResults } from '../../../hooks/index.ts'
import type { UseIndexedResultsProps } from './lib/index.ts'

export const UseIndexedResultsNoPoll: React.FC<UseIndexedResultsProps> = ({ address, chainId, diviners, tokenInterface }) => {
  const [archivist] = useWeakArchivistFromNode('Archivist')

  const config = useMemo(() => {
    const indexedQueries = [{ address, chainId, implemented: true, schema: PayloadDivinerQuerySchema, tokenInterface }]
    const config: UseIndexedResultsConfig = {
      indexedResultsConfig: {
        diviners,
        indexedQueries,
        processIndexedResults: {
          parseIndexedResults: async (payloads: Payload[]) => {
            return await Promise.all(
              payloads.map(async (payload) => {
                const castPayload = payload as Payload & { sources: Hash[] }
                const results = (await archivist?.deref()?.get(castPayload.sources as Hash[])) ?? []
                // return contract payload
                return results[1]
              }),
            )
          },
        },
      },
      pollingConfig: {
        maxRetries: 1,
      },
      trigger: !!archivist,
    }
    return config
  }, [address, archivist, chainId, diviners, tokenInterface])

  const results = useIndexedResults(config)

  return (
    <FlexCol alignItems="start">
      <h1>Polling Results from Hook</h1>
      {results
        ? <pre>{JSON.stringify(results, null, 2)}</pre>
        : null}
    </FlexCol>
  )
}
