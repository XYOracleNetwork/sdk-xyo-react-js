import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { ModuleParams } from '@xyo-network/module'
import { MemoryNode, NodeConfig } from '@xyo-network/node'
import { useState } from 'react'

import { NodeProvider } from './Node/Provider'

export type MemoryNodeProviderProps = WithChildren<{
  moduleParams?: ModuleParams<NodeConfig>
  required?: boolean
}> &
  ModuleParams<NodeConfig>

export const MemoryNodeProvider: React.FC<MemoryNodeProviderProps> = ({ children, moduleParams }) => {
  const [node, setNode] = useState<MemoryNode>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const node = await MemoryNode.create(moduleParams)
      if (mounted()) {
        setNode(node)
      }
    },
    [moduleParams],
  )

  return <NodeProvider node={node}>{children}</NodeProvider>
}
