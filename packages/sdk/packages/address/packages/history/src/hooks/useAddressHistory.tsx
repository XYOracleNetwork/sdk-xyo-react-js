import type { Address } from '@xylabs/hex'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import type { AddressHistoryQueryPayload } from '@xyo-network/diviner-address-history-model'
import { AddressHistoryQuerySchema } from '@xyo-network/diviner-address-history-model'
import { TYPES } from '@xyo-network/node-core-types'
import { PayloadBuilder } from '@xyo-network/payload-builder'
import type { WithMeta, WithSources } from '@xyo-network/payload-model'
import { useWeakDivinerFromNode } from '@xyo-network/react-diviner'
import { useState } from 'react'

export const useAddressHistory = (address?: Address): [BoundWitness[] | undefined, Error | undefined, () => void] => {
  const [diviner, divinerError] = useWeakDivinerFromNode(TYPES.AddressHistoryDiviner)
  const [refresh, setRefresh] = useState(1)
  const [blocks, setBlocks] = useState<BoundWitness[]>()
  const [error, setError] = useState<Error>()
  const refreshHistory = () => setRefresh(previous => previous + 1)

  useAsyncEffect(

    async (mounted) => {
      if (divinerError) {
        setBlocks(undefined)
        setError(divinerError)
      } else {
        const instance = diviner?.deref()
        if (instance) {
          try {
            const query
              = address
                ? [await new PayloadBuilder<AddressHistoryQueryPayload>({ schema: AddressHistoryQuerySchema }).fields({ address }).build()]
                : undefined
            const blocks = (await instance.divine(query)) as WithSources<WithMeta<BoundWitness>>[]
            if (mounted()) {
              setBlocks(blocks)
              setError(undefined)
            }
          } catch (ex) {
            if (mounted()) {
              setError(ex as Error)
              setBlocks(undefined)
            }
          }
        } else {
          setBlocks(undefined)
          setError(undefined)
        }
      }
    },
    [address, refresh, diviner, divinerError],
  )

  return [blocks as BoundWitness[], error, refreshHistory]
}
