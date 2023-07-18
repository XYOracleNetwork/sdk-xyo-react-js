import { ModuleFromNodeConfig, useModuleFromNode } from '@xyo-network/react-node'
import { asWitnessInstance, WitnessInstance } from '@xyo-network/witness'

export const useWitnessFromNode = (
  nameOrAddress?: string,
  config?: ModuleFromNodeConfig,
): [WitnessInstance | null | undefined, Error | undefined] => {
  const [module, error] = useModuleFromNode(nameOrAddress, config)
  const instance = asWitnessInstance(module)
  if (module && !instance) {
    return [null, Error('Resolved mode is not a SentinelInstance')]
  }
  return [instance, error]
}
