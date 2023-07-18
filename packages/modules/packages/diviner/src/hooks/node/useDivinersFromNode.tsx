import { DivinerInstance, isDivinerInstance } from '@xyo-network/diviner'
import { ModuleFilter } from '@xyo-network/module-model'
import { ModuleFromNodeConfig, useModulesFromNode } from '@xyo-network/react-node'

export const useDivinersFromNode = (
  filter?: ModuleFilter,
  config?: ModuleFromNodeConfig,
): [DivinerInstance[] | null | undefined, Error | undefined] => {
  const [modules, error] = useModulesFromNode(filter, config)
  if (error) {
    return [null, error]
  }
  if (modules) {
    return [
      modules.reduce<DivinerInstance[]>((prev, module) => {
        if (isDivinerInstance(module)) {
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
