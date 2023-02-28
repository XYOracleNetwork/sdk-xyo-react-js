import { NodeModule, NodeWrapper } from '@xyo-network/node'
import { useContextEx } from '@xyo-network/react-shared'
import { Dispatch, useEffect, useState } from 'react'

import { NodeContext } from './Context'

export const useNode = <T extends NodeModule = NodeModule>(required = true): [T | undefined, Dispatch<NodeModule> | undefined] => {
  const { node, setNode } = useContextEx(NodeContext, 'Node', required)

  return [node as T, setNode]
}

export const useWrappedNode = <T extends NodeModule = NodeModule>(): [NodeWrapper | undefined] => {
  const [wrappedNode, setWrappedNode] = useState<NodeWrapper>()
  const [node] = useNode<T>()

  useEffect(() => {
    setWrappedNode(node ? NodeWrapper.wrap(node) : undefined)
  }, [node])

  return [wrappedNode]
}
