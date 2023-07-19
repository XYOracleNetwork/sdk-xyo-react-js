import { ModuleFromNodeConfig, useModuleFromNode } from '@xyo-network/react-node'
import { asSentinelInstance, SentinelInstance } from '@xyo-network/sentinel'

export const useSentinelFromNode = (nameOrAddress?: string, config?: ModuleFromNodeConfig): [SentinelInstance | undefined, Error | undefined] => {
  const [module, error] = useModuleFromNode(nameOrAddress, config)
  const instance = asSentinelInstance(module)
  if (module && !instance) {
    const error = Error(`Resolved module is not a SentinelInstance [${module.config?.schema}:${module.config?.name}:${module.address}]`)
    console.error(error.message)
    return [undefined, error]
  }
  return [instance, error]
}
