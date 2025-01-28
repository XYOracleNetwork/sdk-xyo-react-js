import type { DivinerInstance } from '@xyo-network/diviner-model'
import { isDivinerInstance } from '@xyo-network/diviner-model'
import type { ModuleIdentifier } from '@xyo-network/module-model'
import type { ModuleFromNodeConfig } from '@xyo-network/react-node'
import { useModulesFromNode } from '@xyo-network/react-node'

/** @deprecated use useWeakDivinersFromNode */
export const useDivinersFromNode = (
  ids?: ModuleIdentifier[],
  config?: ModuleFromNodeConfig,
): [DivinerInstance[] | null | undefined, Error | undefined] => {
  const [modules, error] = useModulesFromNode(ids, config)
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
