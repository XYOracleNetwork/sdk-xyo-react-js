import { useAsyncEffect } from '@xylabs/react-shared'
import { DivinerWrapper } from '@xyo-network/diviner-wrapper'
import { XyoPayload, XyoPayloads } from '@xyo-network/payload-model'
import { assertDefinedEx } from '@xyo-network/react-shared'
import { useState } from 'react'

import { useMemoryNodeUpdates } from './useMemoryNodeUpdates'
import { useProvidedNode } from './useProvidedNode'

export const useNodeQueryDivinerRaw = (
  moduleIdentifier?: string,
  query?: XyoPayload,
  refresher?: boolean,
): [XyoPayloads | undefined, Error | undefined] => {
  const [result, setResult] = useState<XyoPayloads>()
  const [error, setError] = useState<Error>()
  const [node] = useProvidedNode()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      if (moduleIdentifier && query && node && refresher) {
        try {
          const divinerModule = (await node.downResolver.resolve({ name: [moduleIdentifier] })).pop()
          assertDefinedEx(divinerModule, `Unable to find moduleIdentifier: ${moduleIdentifier}`)
          const diviner = DivinerWrapper.wrap(assertDefinedEx(divinerModule, `Unable to find moduleIdentifier: ${moduleIdentifier}`))

          const result = await diviner.divine([query])
          setResult(result)
          setError(undefined)
        } catch (e) {
          console.error(e)
          setResult(undefined)
          setError(e as Error)
        }
      }
    },
    [moduleIdentifier, node, query, refresher],
  )

  return [result, error]
}

export const useNodeQueryDiviner = (
  moduleIdentifier?: string,
  query?: XyoPayload,
  refresher?: boolean,
  refreshAddresses?: string[],
): ReturnType<typeof useNodeQueryDivinerRaw> => {
  const { module } = useMemoryNodeUpdates(refreshAddresses)
  const [result, error] = useNodeQueryDivinerRaw(moduleIdentifier, query, refresher ?? !!module)

  return [result, error]
}
