import { useAsyncEffect } from '@xylabs/react-async-effect'
import { BoundWitness } from '@xyo-network/boundwitness-model'
import { AddressHistoryQuerySchema } from '@xyo-network/diviner-address-history-model'
import { TYPES } from '@xyo-network/node-core-types'
import { PayloadBuilder } from '@xyo-network/payload-builder'
import { useDiviner } from '@xyo-network/react-diviner'
import { useState } from 'react'

export const useAddressHistory = (address?: string): [BoundWitness[] | undefined, Error | undefined, () => void] => {
  const [diviner, divinerError] = useDiviner(TYPES.AddressHistoryDiviner.description)
  const [refresh, setRefresh] = useState(1)
  const [blocks, setBlocks] = useState<BoundWitness[]>()
  const [error, setError] = useState<Error>()
  const refreshHistory = () => setRefresh((previous) => previous + 1)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (divinerError) {
        setBlocks(undefined)
        setError(divinerError)
      } else {
        if (diviner) {
          try {
            const query = address ? [new PayloadBuilder({ schema: AddressHistoryQuerySchema }).fields({ address }).build()] : undefined
            const blocks = (await diviner.divine(query)) as BoundWitness[]
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
