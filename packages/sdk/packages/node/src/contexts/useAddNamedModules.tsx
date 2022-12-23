import { ApiConfig } from '@xylabs/api'
import { useAsyncEffect } from '@xylabs/react-shared'
import { ArchivistWrapper } from '@xyo-network/archivist'
import { DivinerWrapper } from '@xyo-network/diviner-wrapper'
import { HttpProxyModule } from '@xyo-network/http-proxy-module'
import { AbstractModuleConfigSchema, Module, ModuleWrapper } from '@xyo-network/module'
import { MemoryNode } from '@xyo-network/node'
import { useState } from 'react'

import { useNode } from './useNode'

type ModuleList = Record<string, symbol>

const addWrapper = (remoteModule: Module) => {
  let wrapper: ModuleWrapper | undefined
  if (remoteModule.config.schema.includes('divine')) {
    wrapper = new DivinerWrapper(remoteModule)
  } else if (remoteModule.config.schema.includes('archivist')) {
    wrapper = new ArchivistWrapper(remoteModule)
  }
  return wrapper
}

const addToNode = (remoteModule: Module, name: string, memoryNode: MemoryNode) => {
  const wrapper = addWrapper(remoteModule)
  memoryNode.register(wrapper ?? remoteModule)
  memoryNode.attach(remoteModule.address, name)
  console.log('attached:', name)
}

const resolveNode = async (node: MemoryNode, reset?: boolean) => {
  let localNode = node
  if (reset) {
    localNode = await MemoryNode.create()
  }
  return localNode
}

export const useAddNamedModules = (moduleList?: ModuleList, apiConfig?: ApiConfig, reset = false) => {
  const [node, setNode] = useNode<MemoryNode>()
  const [complete, setComplete] = useState(false)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      if (moduleList && apiConfig && node && !complete) {
        const localNode = await resolveNode(node, reset)
        await Promise.allSettled(
          Object.entries(moduleList).map(async ([_key, { description }]) => {
            try {
              const remoteModule = await HttpProxyModule.create({
                apiConfig,
                config: { schema: AbstractModuleConfigSchema },
                name: description,
              })

              addToNode(remoteModule, description ?? 'unknown', localNode)
              // using .assign instead of spread because we need to keep the prototype chain intact for root node / module methods
              const newNode = Object.assign(Object.create(Object.getPrototypeOf(node)), node)
              setNode?.(newNode)
              setComplete(true)
            } catch (error) {
              console.log(error)
            }
          }),
        )
      }
    },
    [apiConfig, complete, moduleList, node, reset, setNode],
  )
  return complete
}
