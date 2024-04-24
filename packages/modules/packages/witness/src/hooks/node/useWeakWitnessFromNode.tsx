import { ModuleFromNodeConfig, useWeakModuleFromNode } from '@xyo-network/react-node'
import { asWitnessInstance, WitnessInstance } from '@xyo-network/witness-model'

export const useWeakWitnessFromNode = (
  nameOrAddressOrInstance?: string | WitnessInstance,
  config?: ModuleFromNodeConfig,
): [WeakRef<WitnessInstance> | undefined, Error | undefined] => {
  const [module, error] = useWeakModuleFromNode(nameOrAddressOrInstance, config)
  const instance = module?.deref()
  const sentinel = asWitnessInstance(instance)
  if (instance && !sentinel) {
    const error = new Error(`Resolved module is not a DivinerInstance [${instance.id}]`)
    console.error(error.message)
    return [undefined, error]
  }
  return [sentinel ? new WeakRef(sentinel) : undefined, error]
}
