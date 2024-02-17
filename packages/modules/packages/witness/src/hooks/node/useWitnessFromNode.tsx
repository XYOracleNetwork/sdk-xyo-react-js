import { ModuleFromNodeConfig, useModuleFromNode } from '@xyo-network/react-node'
import { asWitnessInstance, WitnessInstance } from '@xyo-network/witness-model'

export const useWitnessFromNode = (
  nameOrAddressOrInstance?: string | WitnessInstance,
  config?: ModuleFromNodeConfig,
): [WitnessInstance | undefined, Error | undefined] => {
  const [module, error] = useModuleFromNode(nameOrAddressOrInstance, config)
  const instance = asWitnessInstance(module)
  if (module && !instance) {
    const error = new Error(`Resolved module is not a WitnessInstance [${module.config?.schema}:${module.config?.name}:${module.address}]`)
    console.error(error.message)
    return [undefined, error]
  }
  return [instance, error]
}
