import type { ModuleFromNodeConfig } from '@xyo-network/react-node'
import { useModuleFromNode } from '@xyo-network/react-node'
import type { WitnessInstance } from '@xyo-network/witness-model'
import { asWitnessInstance } from '@xyo-network/witness-model'

export const useWitnessFromNode = (
  nameOrAddressOrInstance?: string | WitnessInstance,
  config?: ModuleFromNodeConfig,
): [WitnessInstance | undefined, Error | undefined] => {
  const [mod, error] = useModuleFromNode(nameOrAddressOrInstance, config)
  const instance = asWitnessInstance(mod)
  if (mod && !instance) {
    const error = new Error(`Resolved module is not a WitnessInstance [${mod.config?.schema}:${mod.config?.name}:${mod.address}]`)
    console.error(error.message)
    return [undefined, error]
  }
  return [instance, error]
}
