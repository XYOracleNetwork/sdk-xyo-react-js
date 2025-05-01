import { exists } from '@xylabs/exists'
import { usePromise } from '@xylabs/react-promise'
import type { ModuleIdentifier, ModuleInstance } from '@xyo-network/module-model'
import { useState } from 'react'

import { getModuleFilterOptions } from './getModuleFilterOptions.ts'
import type { ModuleFromNodeConfig } from './ModuleFromNodeConfig.ts'
import { useNode } from './useNode.ts'

/** @deprecated use useWeakModulesFromNode */
export const useModulesFromNode = (ids?: ModuleIdentifier[], config?: ModuleFromNodeConfig): [ModuleInstance[] | undefined, Error | undefined] => {
  const [node, nodeError] = useNode(config)
  const logger = config?.logger
  const filterOptions = getModuleFilterOptions()
  const [result, setResult] = useState<ModuleInstance[] | undefined>()
  const [, error] = usePromise(async () => {
    logger?.debug('useModuleFromNode: resolving')
    if (node) {
      const refreshModules = async () => {
        const moduleInstances = ids
          ? (await Promise.all(ids.map(id => node.resolve(id, filterOptions)))).filter(exists)
          : await node.resolve('*', filterOptions)
        setResult(moduleInstances)
        return moduleInstances
      }
      node.on('moduleAttached', async ({ mod }) => {
        logger?.debug(`useModuleFromNode: moduleAttached [${mod.config.name ?? mod.address}]`)
        await refreshModules()
      })
      node.on('moduleDetached', async ({ mod }) => {
        logger?.debug(`useModuleFromNode: moduleDetached [${mod.config.name ?? mod.address}]`)
        await refreshModules()
      })
      return await refreshModules()
    }
    console.log('Result: No Node')
  }, [node, ids])
  return [result, nodeError ?? error]
}
