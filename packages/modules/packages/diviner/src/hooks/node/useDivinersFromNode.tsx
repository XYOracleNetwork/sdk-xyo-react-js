import { DivinerInstance, isDivinerInstance } from '@xyo-network/diviner-model'
import { ModuleFilter } from '@xyo-network/module-model'
import { ModuleFromNodeConfig, useModulesFromNode } from '@xyo-network/react-node'

/** @deprecated use useWeakDivinersFromNode */
export const useDivinersFromNode = (
  filter?: ModuleFilter,
  config?: ModuleFromNodeConfig,
): [DivinerInstance[] | null | undefined, Error | undefined] => {
  const [modules, error] = useModulesFromNode(filter, config)
  if (error) {
    return [null, error]
  }
  return modules
    ? [
        // eslint-disable-next-line unicorn/no-array-reduce
        modules.reduce<DivinerInstance[]>((prev, mod) => {
          if (isDivinerInstance(mod)) {
            prev.push(mod)
          }
          return prev
        }, []),
        undefined,
      ]
    : [modules, error]
}
