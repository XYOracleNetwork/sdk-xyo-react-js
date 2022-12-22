import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { AddressHistoryQuerySchema } from '@xyo-network/diviner'
import { TYPES } from '@xyo-network/node-core-types'
import { XyoPayload, XyoPayloadBuilder } from '@xyo-network/payload'
import { useNodeQueryDiviner } from '@xyo-network/react-node'
import { useEffect, useState } from 'react'

export const useAddressHistory = (address?: string): [XyoBoundWitness[] | undefined, Error | undefined, () => void] => {
  const [query, setQuery] = useState<XyoPayload>()
  const [refresh, setRefresh] = useState(1)
  const [blocks, error] = useNodeQueryDiviner(TYPES.AddressHistoryDiviner.description, query)
  const refreshHistory = () => setRefresh((previous) => previous + 1)

  useEffect(() => {
    if (address) {
      setQuery(new XyoPayloadBuilder({ schema: AddressHistoryQuerySchema }).fields({ address }).build())
    }
  }, [address, refresh])

  return [blocks as XyoBoundWitness[], error, refreshHistory]
}
