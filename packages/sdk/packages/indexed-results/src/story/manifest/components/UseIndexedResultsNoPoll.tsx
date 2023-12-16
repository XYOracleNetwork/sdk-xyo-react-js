import { FlexCol } from '@xylabs/react-flexbox'
import { PayloadDivinerQuerySchema } from '@xyo-network/diviner-payload-model'
import { Payload } from '@xyo-network/payload-model'
import { useArchivistFromNode } from '@xyo-network/react-archivist'
import { useMemo } from 'react'

import { useIndexedResults, UseIndexedResultsConfig } from '../../../hooks'
import { UseIndexedResultsProps } from './lib'

export const UseIndexedResultsNoPoll: React.FC<UseIndexedResultsProps> = ({ address, chainId, diviners, tokenInterface }) => {
  const [archivist] = useArchivistFromNode('Archivist')

  const config = useMemo(() => {
    const indexedQuery = { address, chainId, implemented: true, schema: PayloadDivinerQuerySchema, tokenInterface }
    const config: UseIndexedResultsConfig = {
      indexedResultsConfig: {
        diviners,
        indexedQuery,
        processIndexedResults: {
          parseIndexedResults: async (payloads: Payload[]) => {
            return await Promise.all(
              payloads.map(async (payload) => {
                const castPayload = payload as Payload & { sources: string[] }
                const results = (await archivist?.get(castPayload.sources as string[])) ?? []
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
      {results ? <pre>{JSON.stringify(results, null, 2)}</pre> : null}
    </FlexCol>
  )
}
