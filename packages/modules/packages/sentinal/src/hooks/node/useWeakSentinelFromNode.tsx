import { ModuleFromNodeConfig, useWeakModuleFromNode } from '@xyo-network/react-node'
import { asSentinelInstance, SentinelInstance } from '@xyo-network/sentinel-model'

export const useWeakSentinelFromNode = (
  nameOrAddressOrInstance?: string | SentinelInstance,
  config?: ModuleFromNodeConfig,
): [WeakRef<SentinelInstance> | undefined, Error | undefined] => {
  const [module, error] = useWeakModuleFromNode(nameOrAddressOrInstance, config)
  const instance = module?.deref()
  const sentinel = asSentinelInstance(instance)
  if (instance && !sentinel) {
    const error = new Error(`Resolved module is not a DivinerInstance [${instance.id}]`)
    console.error(error.message)
    return [undefined, error]
  }
  return [sentinel ? new WeakRef(sentinel) : undefined, error]
}
