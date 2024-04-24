import { ArchivistInstance, asArchivistInstance } from '@xyo-network/archivist-model'
import { ModuleFromNodeConfig, useWeakModuleFromNode } from '@xyo-network/react-node'

export const useWeakArchivistFromNode = (
  nameOrAddressOrInstance?: string | ArchivistInstance,
  config?: ModuleFromNodeConfig,
): [WeakRef<ArchivistInstance> | undefined, Error | undefined] => {
  const [module, error] = useWeakModuleFromNode(nameOrAddressOrInstance, config)
  const instance = module?.deref()
  const archivist = asArchivistInstance(instance)
  if (instance && !archivist) {
    const error = new Error(`Resolved module is not a ArchivistInstance [${instance.config?.schema}:${instance.id}]`)
    console.error(error.message)
    return [undefined, error]
  }
  return [archivist ? new WeakRef(archivist) : undefined, error]
}
