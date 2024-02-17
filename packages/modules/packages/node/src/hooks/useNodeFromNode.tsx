import { asNodeInstance, NodeInstance } from '@xyo-network/node-model'

import { ModuleFromNodeConfig } from './ModuleFromNodeConfig'
import { useModuleFromNode } from './useModuleFromNode'

export const useNodeFromNode = (
  nameOrAddressOrInstance?: string | NodeInstance,
  config?: ModuleFromNodeConfig,
): [NodeInstance | undefined, Error | undefined] => {
  const [module, error] = useModuleFromNode(nameOrAddressOrInstance, config)
  const instance = asNodeInstance(module)
  if (module && !instance) {
    const error = new Error(`Resolved module is not a NodeInstance [${module.config?.schema}:${module.config?.name}:${module.address}]`)
    console.error(error.message)
    return [undefined, error]
  }
  return [instance, error]
}
