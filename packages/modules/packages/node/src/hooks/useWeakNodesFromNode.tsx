import { exists } from '@xylabs/exists'
import { ModuleFilter } from '@xyo-network/module-model'
import { asNodeInstance, NodeInstance } from '@xyo-network/node-model'

import { ModuleFromNodeConfig } from './ModuleFromNodeConfig.js'
import { useWeakModulesFromNode } from './useWeakModulesFromNode.js'

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
