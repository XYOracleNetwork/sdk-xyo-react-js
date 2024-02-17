import { ArchivistInstance, isArchivistInstance } from '@xyo-network/archivist'
import { ModuleFilter } from '@xyo-network/module-model'
import { ModuleFromNodeConfig, useModulesFromNode } from '@xyo-network/react-node'

export const useArchivistsFromNode = (
  filter?: ModuleFilter,
  config?: ModuleFromNodeConfig,
): [ArchivistInstance[] | null | undefined, Error | undefined] => {
  const [modules, error] = useModulesFromNode(filter, config)
  if (error) {
    return [null, error]
  }
  return modules ?
      [
        // eslint-disable-next-line unicorn/no-array-reduce
        modules.reduce<ArchivistInstance[]>((prev, module) => {
          if (isArchivistInstance(module)) {
            prev.push(module)
          }
          return prev
        }, []),
        undefined,
      ]
    : [modules, error]
}
