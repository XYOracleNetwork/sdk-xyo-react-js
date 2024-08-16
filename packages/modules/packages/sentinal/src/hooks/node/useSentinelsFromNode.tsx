import type { ModuleFilter } from '@xyo-network/module-model'
import type { ModuleFromNodeConfig } from '@xyo-network/react-node'
import { useModulesFromNode } from '@xyo-network/react-node'
import type { SentinelInstance } from '@xyo-network/sentinel-model'
import { isSentinelInstance } from '@xyo-network/sentinel-model'

export const useSentinelsFromNode = (
  filter?: ModuleFilter,
  config?: ModuleFromNodeConfig,
): [SentinelInstance[] | null | undefined, Error | undefined] => {
  const [modules, error] = useModulesFromNode(filter, config)
  if (error) {
    return [null, error]
  }
  return modules
    ? [
        // eslint-disable-next-line unicorn/no-array-reduce
        modules.reduce<SentinelInstance[]>((prev, mod) => {
          if (isSentinelInstance(mod)) {
            prev.push(mod)
          }
          return prev
        }, []),
        undefined,
      ]
    : [modules, error]
}
