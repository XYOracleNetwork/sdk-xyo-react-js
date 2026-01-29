import { exists } from '@xylabs/sdk-js'
import type { ModuleIdentifier } from '@xyo-network/module-model'
import type { NodeInstance } from '@xyo-network/node-model'
import { asNodeInstance } from '@xyo-network/node-model'

import type { ModuleFromNodeConfig } from './ModuleFromNodeConfig.ts'
import { useWeakModulesFromNode } from './useWeakModulesFromNode.ts'

export const useWeakNodesFromNode = (
  ids?: ModuleIdentifier[],
  config?: ModuleFromNodeConfig,
): [WeakRef<NodeInstance>[] | null | undefined, Error | undefined] => {
  const [modules, error] = useWeakModulesFromNode(ids, config)
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
