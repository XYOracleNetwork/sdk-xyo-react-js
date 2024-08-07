import { ModuleFilter } from '@xyo-network/module-model'
import { ModuleFromNodeConfig, useModulesFromNode } from '@xyo-network/react-node'
import { isSentinelInstance, SentinelInstance } from '@xyo-network/sentinel-model'

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
