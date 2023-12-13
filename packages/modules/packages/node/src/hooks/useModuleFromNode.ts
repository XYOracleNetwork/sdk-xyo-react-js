import { usePromise } from '@xylabs/react-promise'
import { asModuleInstance, isModuleInstance, ModuleInstance } from '@xyo-network/module-model'
import { useState } from 'react'

import { ModuleFromNodeConfig, useModuleFromNodeConfigLogger } from './ModuleFromNodeConfig'
import { useModuleFilterOptions } from './useModuleFilterOptions'
import { useNode } from './useNode'

export const useModuleFromNode = (
  nameOrAddressOrInstance?: string | ModuleInstance,
  config?: ModuleFromNodeConfig,
): [ModuleInstance | undefined, Error | undefined] => {
  const [node, nodeError] = useNode(config)
  const logger = useModuleFromNodeConfigLogger(config)
  const filterOptions = useModuleFilterOptions(config)
  const [result, setResult] = useState<ModuleInstance | undefined>()
  const [, error] = usePromise(async () => {
    logger?.debug('useModuleFromNode: resolving')
    if (node && nameOrAddressOrInstance) {
      node.on('moduleAttached', ({ module }) => {
        logger?.debug(`useModuleFromNode: moduleAttached [${module.config.name ?? module.address}]`)
        if (module.address === nameOrAddressOrInstance || module.config?.name === nameOrAddressOrInstance) {
          setResult(asModuleInstance(module))
        }
      })
      node.on('moduleDetached', ({ module }) => {
        logger?.debug(`useModuleFromNode: moduleDetached [${module.config.name ?? module.address}]`)
        if (module.address === nameOrAddressOrInstance || module.config?.name === nameOrAddressOrInstance) {
          setResult(undefined)
        }
      })
      if (isModuleInstance(nameOrAddressOrInstance)) {
        setResult(nameOrAddressOrInstance)
      } else {
        const result = await node.resolve(nameOrAddressOrInstance, filterOptions)
        logger?.debug(`Result: ${result?.address}`)
        setResult(result)
      }
      return result
    }
    logger?.debug('Result: No Node')
    return undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node, nameOrAddressOrInstance])
  return [result, nodeError ?? error]
}
