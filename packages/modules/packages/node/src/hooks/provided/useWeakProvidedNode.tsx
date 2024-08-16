import type { NodeInstance } from '@xyo-network/node-model'
import { NodeContext } from '@xyo-network/react-node-context'
import { useContext, useMemo } from 'react'

export const useWeakProvidedNode = (): [WeakRef<NodeInstance> | null | undefined] => {
  const { node } = useContext(NodeContext)
  const weakNode = useMemo(() => (node ? new WeakRef(node) : null), [node])
  return [weakNode]
}
