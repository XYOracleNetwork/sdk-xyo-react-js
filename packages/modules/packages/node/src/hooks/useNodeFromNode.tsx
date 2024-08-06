import { asNodeInstance, NodeInstance } from '@xyo-network/node-model'

import { ModuleFromNodeConfig } from './ModuleFromNodeConfig.js'
import { useModuleFromNode } from './useModuleFromNode.js'

/** @deprecated use useWeakNodeFromNode instead */
export const useNodeFromNode = (
  nameOrAddressOrInstance?: string | NodeInstance,
  config?: ModuleFromNodeConfig,
): [NodeInstance | undefined, Error | undefined] => {
  // eslint-disable-next-line deprecation/deprecation
  const [mod, error] = useModuleFromNode(nameOrAddressOrInstance, config)
  const instance = asNodeInstance(mod)
  if (mod && !instance) {
    const error = new Error(`Resolved module is not a NodeInstance [${mod.config?.schema}:${mod.config?.name}:${mod.address}]`)
    console.error(error.message)
    return [undefined, error]
  }
  return [instance, error]
}
