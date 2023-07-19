import { asNodeInstance, NodeInstance } from '@xyo-network/node-model'

import { ModuleFromNodeConfig, useModuleFromNode } from './useModuleFromNode'

export const useNodeFromNode = (nameOrAddress?: string, config?: ModuleFromNodeConfig): [NodeInstance | undefined, Error | undefined] => {
  const [module, error] = useModuleFromNode(nameOrAddress, config)
  const instance = asNodeInstance(module)
  if (module && !instance) {
    const error = Error(`Resolved module is not a NodeInstance [${module.config.name}:${module.address}]`)
    console.error(error.message)
    return [undefined, error]
  }
  return [instance, error]
}
