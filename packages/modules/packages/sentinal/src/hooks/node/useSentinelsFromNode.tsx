import { ModuleFilter } from '@xyo-network/module-model'
import { ModuleFromNodeConfig, useModulesFromNode } from '@xyo-network/react-node'
import { isSentinelInstance, SentinelInstance } from '@xyo-network/sentinel'

export const useSentinelsFromNode = (
  filter?: ModuleFilter,
  config?: ModuleFromNodeConfig,
): [SentinelInstance[] | null | undefined, Error | undefined] => {
  const [modules, error] = useModulesFromNode(filter, config)
  if (error) {
    return [null, error]
  }
  return modules ?
      [
        // eslint-disable-next-line unicorn/no-array-reduce
        modules.reduce<SentinelInstance[]>((prev, module) => {
          if (isSentinelInstance(module)) {
            prev.push(module)
          }
          return prev
        }, []),
        undefined,
      ]
    : [modules, error]
}
