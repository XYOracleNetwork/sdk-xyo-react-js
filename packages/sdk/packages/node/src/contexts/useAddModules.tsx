import { useAsyncEffect } from '@xylabs/react-shared'
import { ArchivistWrapper } from '@xyo-network/archivist'
import { DivinerWrapper } from '@xyo-network/diviner'
import { AbstractModuleConfigSchema, Module, ModuleWrapper } from '@xyo-network/module'
import { MemoryNode } from '@xyo-network/node'
import { HttpProxyModule } from '@xyo-network/http-proxy-module'
import { useNode } from './useNode'

type ModuleList = Record<string, symbol>

const addWrapper = (remoteModule: Module) => {
  let wrapper: ModuleWrapper | undefined
  if (remoteModule.config.schema.includes('archivist')) {
    wrapper = new ArchivistWrapper(remoteModule)
  } else if (remoteModule.config.schema.includes('divine')) {
    wrapper = new DivinerWrapper(remoteModule)
  }
  return wrapper
}

const addToNode = (remoteModule: Module, name: string, memoryNode: MemoryNode) => {
  const wrapper = addWrapper(remoteModule)
  memoryNode.register(wrapper ?? remoteModule)
  memoryNode.attach(remoteModule.address, name)
  console.log('attached:', name)
}

export const useAddModules = (moduleList?: ModuleList) => {
  const [node, setNode] = useNode<MemoryNode>()
  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      if (moduleList) {
        Object.entries(moduleList).map(async ([_key, { description }]) => {
          try {
            const remoteModule = await HttpProxyModule.create({
              apiConfig,
              config: { schema: AbstractModuleConfigSchema },
              name: description,
            })

            addToNode(remoteModule, description ?? 'unknown', memoryNode)
            // using .assign instead of spread because we need to keep the prototype chain intact for root node / module methods
            const abstractNode = Object.assign(Object.create(Object.getPrototypeOf(memoryNode)), memoryNode)
            setNode?.(abstractNode)
            setComplete(true)
          } catch (error) {
            console.log(error)
          }
        }),
      }
    },
    [],
  )
}
