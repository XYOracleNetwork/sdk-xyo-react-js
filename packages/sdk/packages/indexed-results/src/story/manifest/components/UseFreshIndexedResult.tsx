import { FlexCol } from '@xylabs/react-flexbox'
import { BoundWitness } from '@xyo-network/boundwitness-model'
import { PayloadDivinerQuerySchema } from '@xyo-network/diviner-payload-model'
import { EvmContract } from '@xyo-network/evm-contract-witness'
import { isEvmTokenInterfaceImplemented } from '@xyo-network/evm-token-interface-diviner'
import { Payload } from '@xyo-network/payload-model'
import { useArchivistFromNode } from '@xyo-network/react-archivist'
import { useNode } from '@xyo-network/react-node'
import { useSentinelFromNode } from '@xyo-network/react-sentinel'
import { asSentinelInstance } from '@xyo-network/sentinel-model'
import { BlockchainAddress, BlockchainAddressSchema } from '@xyo-network/witness-blockchain-abstract'
import { TimeStamp } from '@xyo-network/witness-timestamp'
import { useMemo } from 'react'

import { useFreshIndexedResult, UseIndexedResultsConfig } from '../../../hooks'
import { UseIndexedResultsProps } from './lib'

export const UseFreshIndexedResult: React.FC<UseIndexedResultsProps> = ({ address, chainId, diviners, tokenInterface }) => {
  const [archivist] = useArchivistFromNode('Archivist')
  const [contractSentinel] = useSentinelFromNode('EvmContractSentinel')
  const [node] = useNode()

  const config: UseIndexedResultsConfig = useMemo(() => {
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
                const filteredResult = results.filter(isEvmTokenInterfaceImplemented)[0]
                return filteredResult
              }),
            )
          },
        },
        refresh: async () => {
          const collectionCallPayload: BlockchainAddress = { address, chainId: 1, schema: BlockchainAddressSchema }
          const report = await contractSentinel?.report([collectionCallPayload])
          const [, , contract] = (report as [BoundWitness, TimeStamp, EvmContract]) ?? []
          const sentinelName = `${tokenInterface}TokenInterfaceImplementedSentinel`
          const tokenSentinel = asSentinelInstance(await node?.resolve(sentinelName))
          const results = await tokenSentinel?.report([contract])
          return results ?? []
        },
      },
      pollingConfig: {
        maxRetries: null,
      },
      trigger: !!node && !!archivist && !!contractSentinel,
    }

    return config
  }, [address, chainId, tokenInterface, diviners, node, archivist, contractSentinel])

  const results = useFreshIndexedResult(config)

  return (
    <FlexCol alignItems="start">
      <h1>Polling Results from Hook</h1>
      {results ? <pre>{JSON.stringify(results, null, 2)}</pre> : null}
    </FlexCol>
  )
}