import { FlexCol } from '@xylabs/react-flexbox'
import type { Hash } from '@xylabs/sdk-js'
import { exists } from '@xylabs/sdk-js'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import { PayloadDivinerQuerySchema } from '@xyo-network/diviner-payload-model'
import type { EvmContract } from '@xyo-network/evm-contract-witness'
import { isEvmTokenInterfaceImplemented } from '@xyo-network/evm-token-interface-diviner'
import type { Payload } from '@xyo-network/payload-model'
import { useWeakArchivistFromNode } from '@xyo-network/react-archivist'
import { useNode } from '@xyo-network/react-node'
import { useSentinelFromNode } from '@xyo-network/react-sentinel'
import { asSentinelInstance } from '@xyo-network/sentinel-model'
import type { EvmAddress } from '@xyo-network/witness-evm-abstract'
import { EvmAddressSchema } from '@xyo-network/witness-evm-abstract'
import type { TimeStamp } from '@xyo-network/witness-timestamp'
import React, { useMemo } from 'react'

import type { UseIndexedResultsConfig } from '../../../hooks/index.ts'
import { useFreshIndexedResult } from '../../../hooks/index.ts'
import { PollingStrategies } from '../../../interfaces/index.ts'
import type { UseIndexedResultsProps } from './lib/index.ts'

export const UseFreshIndexedResult: React.FC<UseIndexedResultsProps> = ({
  address, chainId, diviners, tokenInterface,
}) => {
  const [archivist] = useWeakArchivistFromNode('Archivist')
  const [contractSentinel] = useSentinelFromNode('EvmContractSentinel')
  const [node] = useNode()

  const config: UseIndexedResultsConfig = useMemo(() => {
    const indexedQueries = [{
      address, chainId, implemented: true, schema: PayloadDivinerQuerySchema, tokenInterface,
    }]
    const config: UseIndexedResultsConfig = {
      indexedResultsConfig: {
        diviners,
        indexedQueries,
        processIndexedResults: {
          parseIndexedResults: async (payloads: Payload[]) => {
            return (
              await Promise.all(
                payloads.map(async (payload) => {
                  const castPayload = payload as Payload & { sources: Hash[] }
                  const results = (await archivist?.deref()?.get(castPayload.sources as Hash[])) ?? []
                  const filteredResult = results.find(isEvmTokenInterfaceImplemented)
                  return filteredResult
                }),
              )
            ).filter(exists)
          },
        },
        refresh: async () => {
          const collectionCallPayload: EvmAddress = {
            address, chainId: 1, schema: EvmAddressSchema,
          }
          const report = await contractSentinel?.report([collectionCallPayload])
          const contract = ((report as [BoundWitness, TimeStamp, EvmContract]) ?? [])[2]
          const sentinelName = `${tokenInterface}TokenInterfaceImplementedSentinel`
          const tokenSentinel = asSentinelInstance(await node?.resolve(sentinelName))
          const results = await tokenSentinel?.report([contract])
          return results ?? []
        },
      },
      pollingConfig: {
        ...PollingStrategies.TillComplete,
        onFoundResult: result => isEvmTokenInterfaceImplemented(result?.[0]),
      },
      trigger: !!node && !!archivist && !!contractSentinel,
    }

    return config
  }, [address, chainId, tokenInterface, diviners, node, archivist, contractSentinel])

  const results = useFreshIndexedResult(config)

  return (
    <FlexCol alignItems="start">
      <h1>Polling Results from Hook</h1>
      {results
        ? <pre>{JSON.stringify(results, null, 2)}</pre>
        : null}
    </FlexCol>
  )
}
