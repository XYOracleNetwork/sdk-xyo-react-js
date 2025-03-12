import type { NodeInstance } from '@xyo-network/node-model'
import { NodeContext } from '@xyo-network/react-node-context'
import { use, useMemo } from 'react'

export const useWeakProvidedNode = (): [WeakRef<NodeInstance> | null | undefined] => {
  const { node } = use(NodeContext)
  const weakNode = useMemo(() => (node ? new WeakRef(node) : null), [node])
  return [weakNode]
}
