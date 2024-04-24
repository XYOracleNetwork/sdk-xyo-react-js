import { exists } from '@xylabs/exists'
import { ArchivistInstance, asArchivistInstance } from '@xyo-network/archivist-model'
import { ModuleFilter } from '@xyo-network/module-model'
import { ModuleFromNodeConfig, useWeakModulesFromNode } from '@xyo-network/react-node'

export const useWeakDivinersFromNode = (
  filter?: ModuleFilter,
  config?: ModuleFromNodeConfig,
): [WeakRef<ArchivistInstance>[] | null | undefined, Error | undefined] => {
  const [modules, error] = useWeakModulesFromNode(filter, config)
  if (error) {
    return [null, error]
  }
  return [
    modules
      ?.map((module) => {
        const instance = asArchivistInstance(module?.deref())
        if (instance) {
          return new WeakRef(instance)
        }
      })
      .filter(exists) ?? [],
    undefined,
  ]
}
