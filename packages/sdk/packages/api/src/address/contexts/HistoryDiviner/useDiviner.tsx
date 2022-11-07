import { useAsyncEffect } from '@xylabs/react-shared'
import { AddressHistoryQuerySchema } from '@xyo-network/api'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { XyoDivinerWrapper } from '@xyo-network/diviner'
import { XyoPayloadBuilder } from '@xyo-network/payload'
import { useState } from 'react'

import { useAddressHistoryDiviner } from './use'

export const useDivineAddressHistory = (address?: string): [XyoBoundWitness[] | undefined, Error | undefined, () => void] => {
  const [blocks, setBlocks] = useState<XyoBoundWitness[]>()
  const [error, setError] = useState<Error>()
  const { diviner } = useAddressHistoryDiviner()
  const [refresh, setRefresh] = useState(1)

  const refreshHistory = () => setRefresh((previous) => previous + 1)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (diviner && address) {
        try {
          const source = new XyoPayloadBuilder({ schema: AddressHistoryQuerySchema }).fields({ address }).build()
          const result = (await new XyoDivinerWrapper(diviner).divine([source])) as XyoBoundWitness[]
          if (mounted() && result) {
            setBlocks(result)
          }
        } catch (e) {
          setError(e as Error)
        }
      }
    },
    [address, diviner, refresh],
  )

  return [blocks, error, refreshHistory]
}
