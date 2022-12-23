import { useAsyncEffect } from '@xylabs/react-shared'
import { DivinerWrapper } from '@xyo-network/diviner-wrapper'
import { MemoryNode } from '@xyo-network/node'
import { XyoPayload, XyoPayloads } from '@xyo-network/payload-model'
import { useState } from 'react'

import { useNode } from './useNode'

export const useNodeQueryDiviner = (moduleIdentifier?: string, query?: XyoPayload): [XyoPayloads | undefined, Error | undefined] => {
  const [result, setResult] = useState<XyoPayloads>()
  const [error, setError] = useState<Error>()
  const [node] = useNode<MemoryNode>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      if (moduleIdentifier && query) {
        try {
          const diviner = (await node?.tryResolve({ name: [moduleIdentifier] }))?.[0] as DivinerWrapper
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
