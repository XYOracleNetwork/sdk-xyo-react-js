import { exists } from '@xylabs/exists'
import type { ArchivistInstance } from '@xyo-network/archivist-model'
import { asArchivistInstance } from '@xyo-network/archivist-model'
import type { ModuleIdentifier } from '@xyo-network/module-model'
import type { ModuleFromNodeConfig } from '@xyo-network/react-node'
import { useWeakModulesFromNode } from '@xyo-network/react-node'

export const useWeakArchivistsFromNode = (
  ids?: ModuleIdentifier[],
  config?: ModuleFromNodeConfig,
): [WeakRef<ArchivistInstance>[] | null | undefined, Error | undefined] => {
  const [modules, error] = useWeakModulesFromNode(ids, config)
  if (error) {
    return [null, error]
  }
  return [
    modules
      ?.map((mod) => {
        const instance = asArchivistInstance(mod?.deref())
        if (instance) {
          return new WeakRef(instance)
        }
      })
      .filter(exists) ?? [],
    undefined,
  ]
}
