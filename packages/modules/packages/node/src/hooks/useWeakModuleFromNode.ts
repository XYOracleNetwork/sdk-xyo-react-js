import { usePromise } from '@xylabs/react-promise'
import { asModuleInstance, isModuleInstance, ModuleInstance } from '@xyo-network/module-model'
import { useState } from 'react'

import { ModuleFromNodeConfig, useModuleFromNodeConfigLogger } from './ModuleFromNodeConfig'
import { useModuleFilterOptions } from './useModuleFilterOptions'
import { useNode } from './useNode'

export const useWeakModuleFromNode = (
  nameOrAddressOrInstance?: string | ModuleInstance,
  config?: ModuleFromNodeConfig,
): [WeakRef<ModuleInstance> | undefined, Error | undefined] => {
  const [node, nodeError] = useNode(config)
  const logger = useModuleFromNodeConfigLogger(config)
  const filterOptions = useModuleFilterOptions(config)
  const [result, setResult] = useState<WeakRef<ModuleInstance> | undefined>()
  const [, error] = usePromise(async () => {
    logger?.debug('useModuleFromNode: resolving')
    const nodeInstance = node
    if (nodeInstance && nameOrAddressOrInstance) {
      nodeInstance.on('moduleAttached', ({ module }) => {
        logger?.debug(`useModuleFromNode: moduleAttached [${module.config.name ?? module.address}]`)
        if (module.address === nameOrAddressOrInstance || module.config?.name === nameOrAddressOrInstance) {
          const instance = asModuleInstance(module)
          setResult(instance ? new WeakRef(instance) : undefined)
        }
      })
      nodeInstance.on('moduleDetached', ({ module }) => {
        logger?.debug(`useModuleFromNode: moduleDetached [${module.config.name ?? module.address}]`)
        if (module.address === nameOrAddressOrInstance || module.config?.name === nameOrAddressOrInstance) {
          setResult(undefined)
        }
      })
      if (isModuleInstance(nameOrAddressOrInstance)) {
        setResult(new WeakRef(nameOrAddressOrInstance))
      } else {
        const result = await nodeInstance.resolve(nameOrAddressOrInstance, filterOptions)
        logger?.debug(`Result: ${result?.address}`)
        setResult(result ? new WeakRef(result) : undefined)
      }
      return result
    }
    logger?.debug('Result: No Node')
    return
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node, nameOrAddressOrInstance])
  return [result, nodeError ?? error]
}
