import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { AddressHistoryQuerySchema, DivinerWrapper } from '@xyo-network/diviner'
import { XyoError } from '@xyo-network/module'
import { XyoPayloadBuilder } from '@xyo-network/payload'
import { useNode } from '@xyo-network/react-node'
import { useState } from 'react'

export const useAddressHistory = (address?: string): [XyoBoundWitness[] | undefined, XyoError | undefined, () => void] => {
  const [blocks, setBlocks] = useState<XyoBoundWitness[]>()
  const [error, setError] = useState<XyoError>()
  const [refresh, setRefresh] = useState(1)

  const refreshHistory = () => setRefresh((previous) => previous + 1)

  const [node] = useNode()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (node && address) {
        try {
          const diviner = (await node.tryResolve({ name: [AddressHistoryQuerySchema] }))[0] as DivinerWrapper
          const query = new XyoPayloadBuilder({ schema: AddressHistoryQuerySchema }).fields({ address }).build()
          const result = (await new DivinerWrapper(diviner).divine([query])) as XyoBoundWitness[]
          if (mounted() && result) {
            setBlocks(result)
          }
        } catch (e) {
          setError(e as XyoError)
        }
      }
    },
    [address, node, refresh],
  )

  return [blocks, error, refreshHistory]
}
