import { asDivinerInstance, DivinerInstance } from '@xyo-network/diviner'
import { ModuleFromNodeConfig, useModuleFromNode } from '@xyo-network/react-node'

export const useDivinerFromNode = (
  nameOrAddress?: string,
  config?: ModuleFromNodeConfig,
): [DivinerInstance | null | undefined, Error | undefined] => {
  const [module, error] = useModuleFromNode(nameOrAddress, config)
  const instance = module ? asDivinerInstance(module) : module
  if (module && !instance) {
    return [null, Error('Resolved module is not a DivinerInstance')]
  }
  return [instance, error]
}
