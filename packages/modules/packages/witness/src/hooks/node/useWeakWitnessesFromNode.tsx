import { exists } from '@xylabs/exists'
import { ModuleFilter } from '@xyo-network/module-model'
import { ModuleFromNodeConfig, useWeakModulesFromNode } from '@xyo-network/react-node'
import { asWitnessInstance, WitnessInstance } from '@xyo-network/witness-model'

export const useWeakWitnessesFromNode = (
  filter?: ModuleFilter,
  config?: ModuleFromNodeConfig,
): [WeakRef<WitnessInstance>[] | null | undefined, Error | undefined] => {
  const [modules, error] = useWeakModulesFromNode(filter, config)
  if (error) {
    return [null, error]
  }
  return [
    modules
      ?.map((module) => {
        const instance = asWitnessInstance(module?.deref())
        if (instance) {
          return new WeakRef(instance)
        }
      })
      .filter(exists) ?? [],
    undefined,
  ]
}
