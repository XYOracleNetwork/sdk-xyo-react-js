import { useAsyncEffect } from '@xylabs/react-shared'
import { DivinerWrapper } from '@xyo-network/diviner'
import { MemoryNode } from '@xyo-network/node'
import { XyoPayload } from '@xyo-network/payload'
import { useState } from 'react'

import { useNode } from './useNode'

export const useNodeQueryDiviner = (moduleIdentifier?: string, query?: XyoPayload) => {
  const [result, setResult] = useState<XyoPayload[]>()
  const [error, setError] = useState<Error>()
  const [node] = useNode<MemoryNode>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      if (moduleIdentifier && query) {
        try {
          const diviner = (await node?.tryResolve({ name: [moduleIdentifier] }))?.[0] as DivinerWrapper
          console.log('diviner', diviner)
          const result = await diviner?.divine([query])
          setResult(result)
          setError(undefined)
        } catch (e) {
          console.error(e)
          setResult(undefined)
          setError(e as Error)
        }
      }
    },
    [moduleIdentifier, node, query],
  )

  return [result, error]
}
