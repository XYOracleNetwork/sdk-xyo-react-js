import { ArchivistInstance, isArchivistInstance } from '@xyo-network/archivist-model'
import { ModuleFilter } from '@xyo-network/module-model'
import { ModuleFromNodeConfig, useModulesFromNode } from '@xyo-network/react-node'

/** @deprecated use useWeakArchivistsFromNode */
export const useArchivistsFromNode = (
  filter?: ModuleFilter,
  config?: ModuleFromNodeConfig,
): [ArchivistInstance[] | null | undefined, Error | undefined] => {
  const [modules, error] = useModulesFromNode(filter, config)
  if (error) {
    return [null, error]
  }
  return modules
    ? [
        // eslint-disable-next-line unicorn/no-array-reduce
        modules.reduce<ArchivistInstance[]>((prev, mod) => {
          if (isArchivistInstance(mod)) {
            prev.push(mod)
          }
          return prev
        }, []),
        undefined,
      ]
    : [modules, error]
}
