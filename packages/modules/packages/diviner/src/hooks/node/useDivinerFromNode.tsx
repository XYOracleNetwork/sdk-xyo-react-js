/* eslint-disable import/no-deprecated */
/* eslint-disable deprecation/deprecation */
import { asDivinerInstance, DivinerInstance } from '@xyo-network/diviner-model'
import { ModuleFromNodeConfig, useModuleFromNode } from '@xyo-network/react-node'

/** @deprecated use useWeakDivinerFromNode */
export const useDivinerFromNode = (
  nameOrAddressOrInstance?: string | DivinerInstance,
  config?: ModuleFromNodeConfig,
): [DivinerInstance | undefined, Error | undefined] => {
  const [module, error] = useModuleFromNode(nameOrAddressOrInstance, config)
  const instance = asDivinerInstance(module)
  if (module && !instance) {
    const error = new Error(`Resolved module is not a DivinerInstance [${module.config?.schema}:${module.config?.name}:${module.address}]`)
    console.error(error.message)
    return [undefined, error]
  }
  return [instance, error]
}
