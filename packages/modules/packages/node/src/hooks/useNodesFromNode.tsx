import { ModuleFilter } from '@xyo-network/module-model'
import { isNodeInstance, NodeInstance } from '@xyo-network/node-model'

import { ModuleFromNodeConfig } from './ModuleFromNodeConfig'
import { useModulesFromNode } from './useModulesFromNode'

export const useNodesFromNode = (filter?: ModuleFilter, config?: ModuleFromNodeConfig): [NodeInstance[] | null | undefined, Error | undefined] => {
  const [modules, error] = useModulesFromNode(filter, config)
  if (error) {
    return [null, error]
  }
  if (modules) {
    return [
      modules.reduce<NodeInstance[]>((prev, module) => {
        if (isNodeInstance(module)) {
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
