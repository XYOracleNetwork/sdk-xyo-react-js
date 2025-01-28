import type { ArchivistInstance } from '@xyo-network/archivist-model'
import { isArchivistInstance } from '@xyo-network/archivist-model'
import type { ModuleIdentifier } from '@xyo-network/module-model'
import type { ModuleFromNodeConfig } from '@xyo-network/react-node'
import { useModulesFromNode } from '@xyo-network/react-node'

/** @deprecated use useWeakArchivistsFromNode */
export const useArchivistsFromNode = (
  ids?: ModuleIdentifier[],
  config?: ModuleFromNodeConfig,
): [ArchivistInstance[] | null | undefined, Error | undefined] => {
  const [modules, error] = useModulesFromNode(ids, config)
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
