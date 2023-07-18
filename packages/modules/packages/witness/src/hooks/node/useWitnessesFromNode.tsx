import { ModuleFilter } from '@xyo-network/module-model'
import { ModuleFromNodeConfig, useModulesFromNode } from '@xyo-network/react-node'
import { isWitnessInstance, WitnessInstance } from '@xyo-network/witness'

export const useWitnessesFromNode = (
  filter?: ModuleFilter,
  config?: ModuleFromNodeConfig,
): [WitnessInstance[] | null | undefined, Error | undefined] => {
  const [modules, error] = useModulesFromNode(filter, config)
  if (error) {
    return [null, error]
  }
  if (modules) {
    return [
      modules.reduce<WitnessInstance[]>((prev, module) => {
        if (isWitnessInstance(module)) {
          prev.push(module)
        }
        return prev
      }, []),
      undefined,
    ]
  } else {
    return [modules, error]
  }
}
