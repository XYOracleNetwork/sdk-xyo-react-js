import { ArchivistInstance, asArchivistInstance } from '@xyo-network/archivist-model'
import { ModuleFromNodeConfig, useModuleFromNode } from '@xyo-network/react-node'

export const useArchivistFromNode = (
  nameOrAddressOrInstance?: string | ArchivistInstance,
  config?: ModuleFromNodeConfig,
): [ArchivistInstance | undefined, Error | undefined] => {
  const [module, error] = useModuleFromNode(nameOrAddressOrInstance, config)
  const instance = asArchivistInstance(module)
  if (module && !instance) {
    const error = Error(`Resolved module is not a ArchivistInstance [${module.config?.schema}:${module.config?.name}:${module.address}]`)
    console.error(error.message)
    return [undefined, error]
  }
  return [instance, error]
}
