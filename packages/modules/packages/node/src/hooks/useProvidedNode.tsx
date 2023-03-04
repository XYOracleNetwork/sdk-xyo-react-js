import { AccountInstance } from '@xyo-network/account-model'
import { NodeModule, NodeWrapper } from '@xyo-network/node'
import { useContext, useEffect, useState } from 'react'

import { NodeContext } from '../contexts'

export const useProvidedNode = (): [NodeModule | undefined] => {
  const { node } = useContext(NodeContext)

  return [node]
}

export const useProvidedWrappedNode = (account?: AccountInstance): [NodeWrapper | undefined, Error | undefined] => {
  const [node] = useProvidedNode()
  const [wrappedNode, setWrappedNode] = useState<NodeWrapper>()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    try {
      if (node) {
        setWrappedNode(NodeWrapper.wrap(node, account))
        setError(undefined)
      }
    } catch (ex) {
      setWrappedNode(undefined)
      setError(ex as Error)
    }
  }, [node, account])

  return [wrappedNode, error]
}
