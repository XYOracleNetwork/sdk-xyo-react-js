import { exists } from '@xylabs/exists'
import type { ModuleFilter } from '@xyo-network/module-model'
import type { ModuleFromNodeConfig } from '@xyo-network/react-node'
import { useWeakModulesFromNode } from '@xyo-network/react-node'
import type { SentinelInstance } from '@xyo-network/sentinel-model'
import { asSentinelInstance } from '@xyo-network/sentinel-model'

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
      ?.map((mod) => {
        const instance = asSentinelInstance(mod?.deref())
        if (instance) {
          return new WeakRef(instance)
        }
      })
      .filter(exists) ?? [],
    undefined,
  ]
}
