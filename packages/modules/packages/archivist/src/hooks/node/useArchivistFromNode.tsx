import { ArchivistInstance, asArchivistInstance } from '@xyo-network/archivist-model'
import { ModuleFromNodeConfig, useModuleFromNode } from '@xyo-network/react-node'

export const useArchivistFromNode = (nameOrAddress?: string, config?: ModuleFromNodeConfig): [ArchivistInstance | undefined, Error | undefined] => {
  const [module, error] = useModuleFromNode(nameOrAddress, config)
  const instance = asArchivistInstance(module)
  if (module && !instance) {
    const error = Error(`Resolved module is not a ArchivistInstance [${module.config.name}:${module.address}]`)
    console.error(error.message)
    return [undefined, error]
  }
  return [instance, error]
}
