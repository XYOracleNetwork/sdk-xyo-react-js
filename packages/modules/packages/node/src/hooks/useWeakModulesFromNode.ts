import { usePromise } from '@xylabs/react-promise'
import type { ModuleFilter, ModuleInstance } from '@xyo-network/module-model'
import { useState } from 'react'

import { getModuleFilterOptions } from './getModuleFilterOptions.ts'
import type { ModuleFromNodeConfig } from './ModuleFromNodeConfig.ts'
import { useNode } from './useNode.ts'

export const useWeakModulesFromNode = (
  filter?: ModuleFilter,
  config?: ModuleFromNodeConfig,
): [WeakRef<ModuleInstance>[] | undefined, Error | undefined] => {
  const [node, nodeError] = useNode(config)
  const logger = config?.logger
  const filterOptions = getModuleFilterOptions()
  const [result, setResult] = useState<WeakRef<ModuleInstance>[] | undefined>()
  const [, error] = usePromise(async () => {
    logger?.debug('useModuleFromNode: resolving')
    const nodeInstance = node
    if (nodeInstance) {
      nodeInstance.on('moduleAttached', async ({ mod }) => {
        const nodeInstance = node
        logger?.debug(`useModuleFromNode: moduleAttached [${mod.config.name ?? mod.address}]`)
        const moduleInstances = filter ? await nodeInstance?.resolve(filter, filterOptions) : await nodeInstance?.resolve('*', filterOptions)
        setResult(moduleInstances?.map(mod => new WeakRef(mod)))
      })
      nodeInstance.on('moduleDetached', async ({ mod }) => {
        const nodeInstance = node
        logger?.debug(`useModuleFromNode: moduleDetached [${mod.config.name ?? mod.address}]`)
        const moduleInstances = filter ? await nodeInstance?.resolve(filter, filterOptions) : await nodeInstance?.resolve('*', filterOptions)
        setResult(moduleInstances?.map(mod => new WeakRef(mod)))
      })
      const moduleInstances = filter ? await nodeInstance.resolve(filter, filterOptions) : await nodeInstance.resolve('*', filterOptions)
      setResult(moduleInstances?.map(mod => new WeakRef(mod)))
      return moduleInstances
    }
    console.log('Result: No Node')
    return
  }, [node, filter])
  return [result, nodeError ?? error]
}
