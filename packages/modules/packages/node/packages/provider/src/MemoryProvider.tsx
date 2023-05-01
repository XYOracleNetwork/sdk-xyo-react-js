import { useAsyncEffect } from '@xylabs/react-async-effect'
import { WithChildren } from '@xylabs/react-shared'
import { Module, ModuleParams } from '@xyo-network/module'
import { MemoryNode, NodeConfig } from '@xyo-network/node'
import { useState } from 'react'

import { NodeProvider } from './Node'

export type MemoryNodeProviderProps = WithChildren<{
  moduleParams?: ModuleParams<NodeConfig>
  modules?: Module[]
  required?: boolean
}> &
  ModuleParams<NodeConfig>

export const MemoryNodeProvider: React.FC<MemoryNodeProviderProps> = ({ children, modules, moduleParams }) => {
  const [node, setNode] = useState<MemoryNode>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      if (node && modules) {
        await Promise.all(
          modules.map(async (module) => {
            await node.register(module)
          }),
        )
        return () => {
          modules.map(async (module) => {
            await node.unregister(module)
          })
        }
      }
    },
    [modules, node],
  )

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
