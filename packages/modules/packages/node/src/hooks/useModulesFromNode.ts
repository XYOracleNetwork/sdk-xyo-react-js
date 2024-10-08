import { usePromise } from '@xylabs/react-promise'
import type { ModuleFilter, ModuleInstance } from '@xyo-network/module-model'
import { useState } from 'react'

import { getModuleFilterOptions } from './getModuleFilterOptions.ts'
import type { ModuleFromNodeConfig } from './ModuleFromNodeConfig.ts'
import { useNode } from './useNode.ts'

/** @deprecated use useModulesFromNode */
export const useModulesFromNode = (filter?: ModuleFilter, config?: ModuleFromNodeConfig): [ModuleInstance[] | undefined, Error | undefined] => {
  const [node, nodeError] = useNode(config)
  const logger = config?.logger
  const filterOptions = getModuleFilterOptions()
  const [result, setResult] = useState<ModuleInstance[] | undefined>()
  const [, error] = usePromise(async () => {
    logger?.debug('useModuleFromNode: resolving')
    if (node) {
      node.on('moduleAttached', async ({ mod }) => {
        logger?.debug(`useModuleFromNode: moduleAttached [${mod.config.name ?? mod.address}]`)
        const moduleInstances = filter ? await node.resolve(filter, filterOptions) : await node.resolve('*', filterOptions)
        setResult(moduleInstances)
      })
      node.on('moduleDetached', async ({ mod }) => {
        logger?.debug(`useModuleFromNode: moduleDetached [${mod.config.name ?? mod.address}]`)
        const moduleInstances = filter ? await node.resolve(filter, filterOptions) : await node.resolve('*', filterOptions)
        setResult(moduleInstances)
      })
      const moduleInstances = filter ? await node.resolve(filter, filterOptions) : await node.resolve('*', filterOptions)
      setResult(moduleInstances)
      return moduleInstances
    }
    console.log('Result: No Node')
    return
  }, [node, filter])
  return [result, nodeError ?? error]
}
