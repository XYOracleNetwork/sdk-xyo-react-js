import { asDivinerInstance, DivinerInstance } from '@xyo-network/diviner-model'
import { ModuleFromNodeConfig, useWeakModuleFromNode } from '@xyo-network/react-node'

export const useWeakDivinerFromNode = (
  nameOrAddressOrInstance?: string | DivinerInstance,
  config?: ModuleFromNodeConfig,
): [WeakRef<DivinerInstance> | undefined, Error | undefined] => {
  const [module, error] = useWeakModuleFromNode(nameOrAddressOrInstance, config)
  const instance = module?.deref()
  const diviner = asDivinerInstance(instance)
  if (instance && !diviner) {
    const error = new Error(`Resolved module is not a DivinerInstance [${instance.id}]`)
    console.error(error.message)
    return [undefined, error]
  }
  return [diviner ? new WeakRef(diviner) : undefined, error]
}
