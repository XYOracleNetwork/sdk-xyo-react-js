import { ModuleFilter } from '@xyo-network/module-model'
// eslint-disable-next-line import/no-deprecated
import { ModuleFromNodeConfig, useModulesFromNode } from '@xyo-network/react-node'
import { isWitnessInstance, WitnessInstance } from '@xyo-network/witness-model'

export const useWitnessesFromNode = (
  filter?: ModuleFilter,
  config?: ModuleFromNodeConfig,
): [WitnessInstance[] | null | undefined, Error | undefined] => {
  // eslint-disable-next-line deprecation/deprecation, import/no-deprecated
  const [modules, error] = useModulesFromNode(filter, config)
  if (error) {
    return [null, error]
  }
  return modules ?
      [
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
