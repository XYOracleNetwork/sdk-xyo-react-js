import type { ModuleFilter } from '@xyo-network/module-model'
import type { NodeInstance } from '@xyo-network/node-model'
import { isNodeInstance } from '@xyo-network/node-model'

import type { ModuleFromNodeConfig } from './ModuleFromNodeConfig.ts'
import { useModulesFromNode } from './useModulesFromNode.ts'

/** @deprecated use useWeakNodesFromNode */
export const useNodesFromNode = (filter?: ModuleFilter, config?: ModuleFromNodeConfig): [NodeInstance[] | null | undefined, Error | undefined] => {
  const [modules, error] = useModulesFromNode(filter, config)
  if (error) {
    return [null, error]
  }
  return modules
    ? [
        // eslint-disable-next-line unicorn/no-array-reduce
        modules.reduce<NodeInstance[]>((prev, mod) => {
          if (isNodeInstance(mod)) {
            prev.push(mod)
          }
          return prev
        }, []),
        undefined,
      ]
    : [modules, error]
}
