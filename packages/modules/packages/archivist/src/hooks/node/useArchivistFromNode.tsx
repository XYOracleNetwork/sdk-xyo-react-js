import { ArchivistInstance, asArchivistInstance } from '@xyo-network/archivist-model'
import { ModuleFromNodeConfig, useModuleFromNode } from '@xyo-network/react-node'

export const useArchivistFromNode = (
  nameOrAddress?: string,
  config?: ModuleFromNodeConfig,
): [ArchivistInstance | null | undefined, Error | undefined] => {
  const [module, error] = useModuleFromNode(nameOrAddress, config)
  const instance = asArchivistInstance(module)
  if (module && !instance) {
    return [null, Error('Resolved module is not an ArchivistInstance')]
  }
  return [instance, error]
}
