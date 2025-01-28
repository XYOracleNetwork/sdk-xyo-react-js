import type { ModuleIdentifier } from '@xyo-network/module-model'
import type { ModuleFromNodeConfig } from '@xyo-network/react-node'
import { useModulesFromNode } from '@xyo-network/react-node'
import type { WitnessInstance } from '@xyo-network/witness-model'
import { isWitnessInstance } from '@xyo-network/witness-model'

export const useWitnessesFromNode = (
  ids?: ModuleIdentifier[],
  config?: ModuleFromNodeConfig,
): [WitnessInstance[] | null | undefined, Error | undefined] => {
  const [modules, error] = useModulesFromNode(ids, config)
  if (error) {
    return [null, error]
  }
  return modules
    ? [
        // eslint-disable-next-line unicorn/no-array-reduce
        modules.reduce<WitnessInstance[]>((prev, mod) => {
          if (isWitnessInstance(mod)) {
            prev.push(mod)
          }
          return prev
        }, []),
        undefined,
      ]
    : [modules, error]
}
