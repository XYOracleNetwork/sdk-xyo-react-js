import { ModuleFromNodeConfig, useModuleFromNode } from '@xyo-network/react-node'
import { asSentinelInstance, SentinelInstance } from '@xyo-network/sentinel'

export const useSentinelFromNode = (
  nameOrAddress?: string,
  config?: ModuleFromNodeConfig,
): [SentinelInstance | null | undefined, Error | undefined] => {
  const [module, error] = useModuleFromNode(nameOrAddress, config)
  const instance = module ? asSentinelInstance(module) : module
  if (module && !instance) {
    return [null, Error('Resolved mode is not a SentinelInstance')]
  }
  return [instance, error]
}
