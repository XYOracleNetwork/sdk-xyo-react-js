import { FlexCol } from '@xylabs/react-flexbox'
import { PayloadDivinerQuerySchema } from '@xyo-network/diviner-payload-model'
import { Payload } from '@xyo-network/payload-model'
import { useArchivistFromNode } from '@xyo-network/react-archivist'
import { useMemo } from 'react'

import { useIndexedResults, UseIndexedResultsConfig } from '../../../hooks'

export interface UseIndexedResultsProps {
  address: string
  chainId: number
  diviners: string[]
  tokenInterface: string
}

export const UseIndexedResults: React.FC<UseIndexedResultsProps> = ({ address, chainId, diviners, tokenInterface }) => {
  const [archivist] = useArchivistFromNode('Archivist')

  const config: UseIndexedResultsConfig = useMemo(() => {
    const indexedQuery = { address, chainId, implemented: true, schema: PayloadDivinerQuerySchema, tokenInterface }
    return {
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
        maxRetries: null,
      },
      trigger: !!archivist,
    }
  }, [address, archivist, chainId, diviners, tokenInterface])

  const results = useIndexedResults(config)

  return (
    <FlexCol alignItems="start">
      <h1>Polling Results</h1>
      {results ? <pre>{JSON.stringify(results, null, 2)}</pre> : null}
    </FlexCol>
  )
}
