import { ModuleFromNodeConfig, useModuleFromNode } from '@xyo-network/react-node'
import { asSentinelInstance, SentinelInstance } from '@xyo-network/sentinel-model'

export const useSentinelFromNode = (
  nameOrAddressOrInstance?: string | SentinelInstance,
  config?: ModuleFromNodeConfig,
): [SentinelInstance | undefined, Error | undefined] => {
  // eslint-disable-next-line deprecation/deprecation
  const [mod, error] = useModuleFromNode(nameOrAddressOrInstance, config)
  const instance = asSentinelInstance(mod)
  if (mod && !instance) {
    const error = new Error(`Resolved module is not a SentinelInstance [${mod.config?.schema}:${mod.config?.name}:${mod.address}]`)
    console.error(error.message)
    return [undefined, error]
  }
  return [instance, error]
}
