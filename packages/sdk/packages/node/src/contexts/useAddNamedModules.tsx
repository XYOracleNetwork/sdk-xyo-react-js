import { ApiConfig } from '@xylabs/api'
import { useAsyncEffect } from '@xylabs/react-shared'
import { ArchivistWrapper } from '@xyo-network/archivist'
import { DivinerWrapper } from '@xyo-network/diviner-wrapper'
import { HttpProxyModule } from '@xyo-network/http-proxy-module'
import { AbstractModuleConfigSchema, Module, ModuleWrapper } from '@xyo-network/module'
import { MemoryNode } from '@xyo-network/node'
import { useCallback, useState } from 'react'

import { useNode } from './useNode'

type ModuleList = Record<string, symbol>

class NodeUtils {
  static addToNode(remoteModule: Module, name: string, memoryNode: MemoryNode) {
    const wrapper = ModuleUtils.addWrapper(remoteModule)
    memoryNode.register(wrapper ?? remoteModule)
    memoryNode.attach(remoteModule.address, name)
    console.log('attached:', name)
  }
  static newNodeInstance(node: MemoryNode) {
    // using .assign instead of spread because we need to keep the prototype chain intact for root node / module methods
    return Object.assign(Object.create(Object.getPrototypeOf(node)), node)
  }
  static async resolveNode(node: MemoryNode, reset?: boolean) {
    let localNode = node
    if (reset) {
      localNode = await MemoryNode.create()
    }
    return localNode
  }
}

class ModuleUtils {
  static addWrapper(remoteModule: Module) {
    let wrapper: ModuleWrapper | undefined
    if (remoteModule.config.schema.includes('divine')) {
      wrapper = new DivinerWrapper(remoteModule)
    } else if (remoteModule.config.schema.includes('archivist')) {
      wrapper = new ArchivistWrapper(remoteModule)
    }
    return wrapper
  }
  static async constructRemoteModule(apiConfig: ApiConfig, description?: string) {
    return await HttpProxyModule.create({
      apiConfig,
      config: { schema: AbstractModuleConfigSchema },
      name: description,
    })
  }
}

export const useAddNamedModules = (moduleList?: ModuleList, apiConfig?: ApiConfig, reset = false) => {
  const [node, setNode] = useNode<MemoryNode>()
  const [complete, setComplete] = useState(false)

  const updateNode = useCallback(
    (node: MemoryNode) => {
      const newNode = NodeUtils.newNodeInstance(node)
      setNode?.(newNode)
    },
    [setNode],
  )

  const handleNewModule = async (apiConfig: ApiConfig, localNode: MemoryNode, description?: string) => {
    try {
      const remoteModule = await ModuleUtils.constructRemoteModule(apiConfig, description)
      NodeUtils.addToNode(remoteModule, description ?? 'unknown', localNode)
    } catch (error) {
      console.error(error)
    }
  }

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      if (moduleList && apiConfig && node && !complete) {
        const localNode = await NodeUtils.resolveNode(node, reset)
        await Promise.allSettled(
          Object.entries(moduleList).map(async ([_key, { description }]) => {
            await handleNewModule(apiConfig, localNode, description)
          }),
        )
        setComplete(true)
        updateNode(node)
      }
    },
    [apiConfig, complete, moduleList, node, reset, setNode, updateNode],
  )
  return complete
}
