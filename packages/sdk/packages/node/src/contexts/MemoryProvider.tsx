import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { ModuleParams } from '@xyo-network/module'
import { MemoryNode, NodeConfig } from '@xyo-network/node'
import { useDataState } from '@xyo-network/react-shared'
import { useState } from 'react'

import { NodeProvider } from './Provider'

export type MemoryNodeProviderProps = WithChildren<{
  required?: boolean
}> &
  ModuleParams<NodeConfig>

export const MemoryNodeProvider: React.FC<MemoryNodeProviderProps> = ({ children, required = false, ...params }) => {
  const [node, setNode] = useState<MemoryNode>()
  const [config, setConfig] = useDataState<ModuleParams<NodeConfig>>(params)
  setConfig(params)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const node = await MemoryNode.create(config)
      if (mounted()) {
        setNode(node)
      }
    },
    [config],
  )

  return (
    <NodeProvider node={node} required={required}>
      {children}
    </NodeProvider>
  )
}
