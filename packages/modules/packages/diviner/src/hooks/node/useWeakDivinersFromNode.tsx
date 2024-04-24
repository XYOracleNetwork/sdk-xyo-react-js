import { exists } from '@xylabs/exists'
import { asDivinerInstance, DivinerInstance } from '@xyo-network/diviner-model'
import { ModuleFilter } from '@xyo-network/module-model'
import { ModuleFromNodeConfig, useWeakModulesFromNode } from '@xyo-network/react-node'

export const useWeakDivinersFromNode = (
  filter?: ModuleFilter,
  config?: ModuleFromNodeConfig,
): [WeakRef<DivinerInstance>[] | null | undefined, Error | undefined] => {
  const [modules, error] = useWeakModulesFromNode(filter, config)
  if (error) {
    return [null, error]
  }
  return [
    modules
      ?.map((module) => {
        const instance = asDivinerInstance(module?.deref())
        if (instance) {
          return new WeakRef(instance)
        }
      })
      .filter(exists) ?? [],
    undefined,
  ]
}
