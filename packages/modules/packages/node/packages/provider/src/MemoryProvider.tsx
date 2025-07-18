import { forget } from '@xylabs/forget'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import type { AttachableModuleInstance, ModuleParams } from '@xyo-network/module-model'
import { MemoryNode } from '@xyo-network/node-memory'
import type { NodeConfig } from '@xyo-network/node-model'
import type { PropsWithChildren } from 'react'
import React, { useState } from 'react'

import { NodeProvider } from './Node/index.ts'

export type MemoryNodeProviderProps = PropsWithChildren<{
  moduleParams?: ModuleParams<NodeConfig>
  modules?: AttachableModuleInstance[]
  required?: boolean
}>
& ModuleParams<NodeConfig>

export const MemoryNodeProvider: React.FC<MemoryNodeProviderProps> = ({
  children, modules, moduleParams,
}) => {
  const [node, setNode] = useState<MemoryNode | null>(null)

  useAsyncEffect(

    async () => {
      if (node && modules) {
        await Promise.all(
          modules.map(async (mod) => {
            await node.register(mod)
          }),
        )
        return () => {
          forget(
            Promise.all(
              modules.map(async (mod) => {
                await node.unregister(mod)
              }),
            ),
          )
        }
      }
    },
    [modules, node],
  )

  useAsyncEffect(

    async (mounted) => {
      const node = await MemoryNode.create(moduleParams ?? {})
      if (mounted()) {
        setNode(node)
      }
    },
    [moduleParams],
  )

  return <NodeProvider node={node}>{children}</NodeProvider>
}
