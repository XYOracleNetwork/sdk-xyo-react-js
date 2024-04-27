import { ModuleFilter } from '@xyo-network/module-model'
import { isNodeInstance, NodeInstance } from '@xyo-network/node-model'

import { ModuleFromNodeConfig } from './ModuleFromNodeConfig'
// eslint-disable-next-line import/no-deprecated
import { useModulesFromNode } from './useModulesFromNode'

/** @deprecated use useWeakNodesFromNode */
export const useNodesFromNode = (filter?: ModuleFilter, config?: ModuleFromNodeConfig): [NodeInstance[] | null | undefined, Error | undefined] => {
  // eslint-disable-next-line import/no-deprecated, deprecation/deprecation
  const [modules, error] = useModulesFromNode(filter, config)
  if (error) {
    return [null, error]
  }
  return modules ?
      [
        // eslint-disable-next-line unicorn/no-array-reduce
        modules.reduce<NodeInstance[]>((prev, module) => {
          if (isNodeInstance(module)) {
            prev.push(module)
          }
          return prev
        }, []),
        undefined,
      ]
    : [modules, error]
}
