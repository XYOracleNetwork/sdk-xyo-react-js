import type { NodeInstance } from '@xyo-network/node-model'
import { asNodeInstance } from '@xyo-network/node-model'

import type { ModuleFromNodeConfig } from './ModuleFromNodeConfig.ts'
import { useModuleFromNode } from './useModuleFromNode.ts'

/** @deprecated use useWeakNodeFromNode instead */
export const useNodeFromNode = (
  nameOrAddressOrInstance?: string | NodeInstance,
  config?: ModuleFromNodeConfig,
): [NodeInstance | undefined, Error | undefined] => {
  const [mod, error] = useModuleFromNode(nameOrAddressOrInstance, config)
  const instance = asNodeInstance(mod)
  if (mod && !instance) {
    const error = new Error(`Resolved module is not a NodeInstance [${mod.config?.schema}:${mod.config?.name}:${mod.address}]`)
    console.error(error.message)
    return [undefined, error]
  }
  return [instance, error]
}
