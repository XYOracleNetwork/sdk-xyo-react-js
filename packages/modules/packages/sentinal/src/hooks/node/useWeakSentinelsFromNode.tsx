import { exists } from '@xylabs/exists'
import { ModuleFilter } from '@xyo-network/module-model'
import { ModuleFromNodeConfig, useWeakModulesFromNode } from '@xyo-network/react-node'
import { asSentinelInstance, SentinelInstance } from '@xyo-network/sentinel-model'

export const useWeakSentinelsFromNode = (
  filter?: ModuleFilter,
  config?: ModuleFromNodeConfig,
): [WeakRef<SentinelInstance>[] | null | undefined, Error | undefined] => {
  const [modules, error] = useWeakModulesFromNode(filter, config)
  if (error) {
    return [null, error]
  }
  return [
    modules
      ?.map((module) => {
        const instance = asSentinelInstance(module?.deref())
        if (instance) {
          return new WeakRef(instance)
        }
      })
      .filter(exists) ?? [],
    undefined,
  ]
}
