import { asNodeInstance, NodeInstance } from '@xyo-network/node-model'

import { ModuleFromNodeConfig, useModuleFromNode } from './useModuleFromNode'

export const useNodeFromNode = (nameOrAddress?: string, config: ModuleFromNodeConfig = {}): [NodeInstance | null | undefined, Error | undefined] => {
  const [module, error] = useModuleFromNode(nameOrAddress, config)
  const instance = asNodeInstance(module)
  if (module && !instance) {
    return [null, Error('Resolved mode is not a NodeInstance')]
  }
  return [instance, error]
}
