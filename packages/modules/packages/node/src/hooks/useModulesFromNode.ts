/* eslint-disable deprecation/deprecation */
/* eslint-disable import/no-deprecated */
import { usePromise } from '@xylabs/react-promise'
import { ModuleFilter, ModuleInstance } from '@xyo-network/module-model'
import { useState } from 'react'

import { ModuleFromNodeConfig } from './ModuleFromNodeConfig'
import { useModuleFilterOptions } from './useModuleFilterOptions'
import { useNode } from './useNode'

/** @deprecated use useModulesFromNode */
export const useModulesFromNode = (filter?: ModuleFilter, config?: ModuleFromNodeConfig): [ModuleInstance[] | undefined, Error | undefined] => {
  const [node, nodeError] = useNode(config)
  const logger = config?.logger
  const filterOptions = useModuleFilterOptions()
  const [result, setResult] = useState<ModuleInstance[] | undefined>()
  const [, error] = usePromise(async () => {
    logger?.debug('useModuleFromNode: resolving')
    if (node) {
      node.on('moduleAttached', async ({ module }) => {
        logger?.debug(`useModuleFromNode: moduleAttached [${module.config.name ?? module.address}]`)
        const moduleInstances = filter ? await node.resolve(filter, filterOptions) : await node.resolve('*', filterOptions)
        setResult(moduleInstances)
      })
      node.on('moduleDetached', async ({ module }) => {
        logger?.debug(`useModuleFromNode: moduleDetached [${module.config.name ?? module.address}]`)
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
