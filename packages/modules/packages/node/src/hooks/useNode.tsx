import { AccountInstance } from '@xyo-network/account-model'
import { NodeModule, NodeWrapper } from '@xyo-network/node'
import { useEffect, useState } from 'react'

import { useModule } from './useModule'
import { useProvidedNode } from './useProvidedNode'

//AT: intentionally not exported
const useNodeModule = (nameOrAddress?: string): [NodeModule | undefined, Error | undefined] => {
  const [providedNode] = useProvidedNode()
  const [node, nodeError] = useModule(nameOrAddress)

  if (nameOrAddress) {
    if (providedNode) {
      return [node as NodeModule, nodeError]
    } else {
      return [providedNode, undefined]
    }
  } else {
    return [providedNode, undefined]
  }
}

export const useNode = (nameOrAddress?: string, account?: AccountInstance): [NodeWrapper | undefined, Error | undefined] => {
  const [node, nodeError] = useNodeModule(nameOrAddress)
  const [wrapper, setWrapper] = useState<NodeWrapper>()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    if (node) {
      if (nodeError) {
        setError(nodeError)
        setWrapper(undefined)
      } else {
        try {
          const wrapper = NodeWrapper.wrap(node, account)
          setWrapper(wrapper)
          setError(undefined)
        } catch (ex) {
          setWrapper(undefined)
          setError(ex as Error)
        }
      }
    } else {
      setWrapper(undefined)
      setError(undefined)
    }
  }, [node, account, nodeError])

  return [wrapper, error]
}
