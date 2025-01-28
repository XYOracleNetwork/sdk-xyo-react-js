import { exists } from '@xylabs/exists'
import type { ModuleIdentifier } from '@xyo-network/module-model'
import type { ModuleFromNodeConfig } from '@xyo-network/react-node'
import { useWeakModulesFromNode } from '@xyo-network/react-node'
import type { WitnessInstance } from '@xyo-network/witness-model'
import { asWitnessInstance } from '@xyo-network/witness-model'

export const useWeakWitnessesFromNode = (
  ids?: ModuleIdentifier[],
  config?: ModuleFromNodeConfig,
): [WeakRef<WitnessInstance>[] | null | undefined, Error | undefined] => {
  const [modules, error] = useWeakModulesFromNode(ids, config)
  if (error) {
    return [null, error]
  }
  return [
    modules
      ?.map((mod) => {
        const instance = asWitnessInstance(mod?.deref())
        if (instance) {
          return new WeakRef(instance)
        }
      })
      .filter(exists) ?? [],
    undefined,
  ]
}
