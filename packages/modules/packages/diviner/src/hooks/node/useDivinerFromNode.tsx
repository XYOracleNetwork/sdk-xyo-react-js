import type { DivinerInstance } from '@xyo-network/diviner-model'
import { asDivinerInstance } from '@xyo-network/diviner-model'
import type { ModuleFromNodeConfig } from '@xyo-network/react-node'
import { useModuleFromNode } from '@xyo-network/react-node'

/** @deprecated use useWeakDivinerFromNode */
export const useDivinerFromNode = (
  nameOrAddressOrInstance?: string | DivinerInstance,
  config?: ModuleFromNodeConfig,
): [DivinerInstance | undefined, Error | undefined] => {
  const [mod, error] = useModuleFromNode(nameOrAddressOrInstance, config)
  const instance = asDivinerInstance(mod)
  if (mod && !instance) {
    const error = new Error(`Resolved module is not a DivinerInstance [${mod.config?.schema}:${mod.config?.name}:${mod.address}]`)
    console.error(error.message)
    return [undefined, error]
  }
  return [instance, error]
}
