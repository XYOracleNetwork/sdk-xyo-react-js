import { exists } from '@xylabs/exists'
import type { ModuleIdentifier } from '@xyo-network/module-model'
import type { ModuleFromNodeConfig } from '@xyo-network/react-node'
import { useWeakModulesFromNode } from '@xyo-network/react-node'
import type { SentinelInstance } from '@xyo-network/sentinel-model'
import { asSentinelInstance } from '@xyo-network/sentinel-model'

export const useWeakSentinelsFromNode = (
  ids?: ModuleIdentifier[],
  config?: ModuleFromNodeConfig,
): [WeakRef<SentinelInstance>[] | null | undefined, Error | undefined] => {
  const [modules, error] = useWeakModulesFromNode(ids, config)
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
