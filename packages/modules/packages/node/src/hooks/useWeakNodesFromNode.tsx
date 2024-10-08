import { exists } from '@xylabs/exists'
import type { ModuleFilter } from '@xyo-network/module-model'
import type { NodeInstance } from '@xyo-network/node-model'
import { asNodeInstance } from '@xyo-network/node-model'

import type { ModuleFromNodeConfig } from './ModuleFromNodeConfig.ts'
import { useWeakModulesFromNode } from './useWeakModulesFromNode.ts'

export const useWeakNodesFromNode = (
  filter?: ModuleFilter,
  config?: ModuleFromNodeConfig,
): [WeakRef<NodeInstance>[] | null | undefined, Error | undefined] => {
  const [modules, error] = useWeakModulesFromNode(filter, config)
  if (error) {
    return [null, error]
  }
  return modules
    ? [
        modules
          .map(mod => asNodeInstance(mod?.deref()))
          .filter(exists)
          .map(mod => new WeakRef(mod)),
        undefined,
      ]
    : [modules, error]
}
