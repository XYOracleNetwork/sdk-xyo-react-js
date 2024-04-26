import { TypeCheck } from '@xylabs/object'
import { usePromise } from '@xylabs/react-promise'
import { isModuleInstance, ModuleInstance } from '@xyo-network/module-model'
import { useState } from 'react'

import { ModuleFromNodeConfig, useModuleFromNodeConfigLogger } from './ModuleFromNodeConfig'
import { useModuleFilterOptions } from './useModuleFilterOptions'
import { useNode } from './useNode'

export const useWeakModuleFromNode = <T extends ModuleInstance | void = void>(
  nameOrAddressOrInstance: string | (T extends ModuleInstance ? T : ModuleInstance) | undefined = undefined,
  config?: ModuleFromNodeConfig,
): [WeakRef<T extends ModuleInstance ? T : ModuleInstance> | undefined, Error | undefined] => {
  const [node, nodeError] = useNode(config)
  const logger = useModuleFromNodeConfigLogger(config)
  const filterOptions = useModuleFilterOptions(config)
  const [result, setResult] = useState<WeakRef<T extends ModuleInstance ? T : ModuleInstance> | undefined>()
  const [, error] = usePromise(async () => {
    logger?.debug('useModuleFromNode: resolving')
    const identity: TypeCheck<T extends ModuleInstance ? T : ModuleInstance> = (config?.identity ?? isModuleInstance) as TypeCheck<
      T extends ModuleInstance ? T : ModuleInstance
    >
    const nodeInstance = node
    if (nodeInstance && nameOrAddressOrInstance) {
      nodeInstance.on('moduleAttached', ({ module }) => {
        logger?.debug(`useModuleFromNode: moduleAttached [${module.config.name ?? module.address}]`)
        if (module.address === nameOrAddressOrInstance || module.config?.name === nameOrAddressOrInstance) {
          setResult(identity(module) ? new WeakRef(module as T extends ModuleInstance ? T : ModuleInstance) : undefined)
        }
      })
      nodeInstance.on('moduleDetached', ({ module }) => {
        logger?.debug(`useModuleFromNode: moduleDetached [${module.config.name ?? module.address}]`)
        if (module.address === nameOrAddressOrInstance || module.config?.name === nameOrAddressOrInstance) {
          setResult(undefined)
        }
      })
      if (identity(nameOrAddressOrInstance)) {
        setResult(new WeakRef(nameOrAddressOrInstance as T extends ModuleInstance ? T : ModuleInstance))
      } else {
        const result = await nodeInstance.resolve(nameOrAddressOrInstance, filterOptions)
        logger?.debug(`Result: ${result?.address}`)
        setResult(identity(result) ? new WeakRef(result as T extends ModuleInstance ? T : ModuleInstance) : undefined)
      }
      return result
    }
    logger?.debug('Result: No Node')
    return
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node, nameOrAddressOrInstance])
  return [result, nodeError ?? error]
}
