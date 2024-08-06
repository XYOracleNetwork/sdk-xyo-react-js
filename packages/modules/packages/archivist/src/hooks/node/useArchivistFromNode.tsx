import { ArchivistInstance, asArchivistInstance } from '@xyo-network/archivist-model'
import { ModuleFromNodeConfig, useModuleFromNode } from '@xyo-network/react-node'

/** @deprecated use useWeakArchivistFromNode */
export const useArchivistFromNode = (
  nameOrAddressOrInstance?: string | ArchivistInstance,
  config?: ModuleFromNodeConfig,
): [ArchivistInstance | undefined, Error | undefined] => {
  const [mod, error] = useModuleFromNode(nameOrAddressOrInstance, config)
  const instance = asArchivistInstance(mod)
  if (mod && !instance) {
    const error = new Error(`Resolved module is not a ArchivistInstance [${mod.config?.schema}:${mod.config?.name}:${mod.address}]`)
    console.error(error.message)
    return [undefined, error]
  }
  return [instance, error]
}
