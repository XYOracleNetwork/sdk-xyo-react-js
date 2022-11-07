import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { XyoModuleParams } from '@xyo-network/module'
import { MemoryNode, NodeConfig } from '@xyo-network/node'
import { useState } from 'react'

import { NodeProvider } from './Provider'

export type MemoryNodeProviderProps = WithChildren<{
  required?: boolean
}> &
  XyoModuleParams<NodeConfig>

export const MemoryNodeProvider: React.FC<MemoryNodeProviderProps> = ({ children, required = false, ...params }) => {
  const [node, setNode] = useState<MemoryNode>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const node = await MemoryNode.create(params)
      if (mounted()) {
        setNode(node)
      }
    },
    [params],
  )

  return (
    <NodeProvider node={node} required={required}>
      {children}
    </NodeProvider>
  )
}
