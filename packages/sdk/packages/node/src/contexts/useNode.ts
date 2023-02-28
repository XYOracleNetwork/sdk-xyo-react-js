import { useAsyncEffect } from '@xylabs/react-shared'
import { NodeModule, NodeWrapper } from '@xyo-network/node'
import { useContext, useEffect, useState } from 'react'

import { NodeContext } from './Context'

export const useNode = <T extends NodeModule = NodeModule>(nameOrAddress?: string): T | undefined => {
  const { node } = useContext(NodeContext)
  const [resolvedNode, setResolvedNode] = useState<T>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const resolvedNode = (node && nameOrAddress ? await NodeWrapper.wrap(node).resolve(nameOrAddress) : node) as T | undefined
      if (mounted()) {
        setResolvedNode(resolvedNode)
      }
    },
    [node, nameOrAddress],
  )

  return resolvedNode
}

export const useWrappedNode = <T extends NodeModule = NodeModule>(nameOrAddress?: string): NodeWrapper | undefined => {
  const node = useNode<T>(nameOrAddress)
  const [wrappedNode, setWrappedNode] = useState<NodeWrapper>()

  useEffect(() => {
    setWrappedNode(node ? NodeWrapper.wrap(node) : undefined)
  }, [node])

  return wrappedNode
}
