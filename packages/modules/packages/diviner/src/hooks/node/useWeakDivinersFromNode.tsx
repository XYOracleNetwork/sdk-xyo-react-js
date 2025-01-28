import { exists } from '@xylabs/exists'
import type { DivinerInstance } from '@xyo-network/diviner-model'
import { asDivinerInstance } from '@xyo-network/diviner-model'
import type { ModuleIdentifier } from '@xyo-network/module-model'
import type { ModuleFromNodeConfig } from '@xyo-network/react-node'
import { useWeakModulesFromNode } from '@xyo-network/react-node'

export const useWeakDivinersFromNode = (
  ids?: ModuleIdentifier[],
  config?: ModuleFromNodeConfig,
): [WeakRef<DivinerInstance>[] | null | undefined, Error | undefined] => {
  const [modules, error] = useWeakModulesFromNode(ids, config)
  if (error) {
    return [null, error]
  }
  return [
    modules
      ?.map((mod) => {
        const instance = asDivinerInstance(mod?.deref())
        if (instance) {
          return new WeakRef(instance)
        }
      })
      .filter(exists) ?? [],
    undefined,
  ]
}
