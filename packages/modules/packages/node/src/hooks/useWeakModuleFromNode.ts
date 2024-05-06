import { TypeCheck } from '@xylabs/object'
import { usePromise } from '@xylabs/react-promise'
import { isModuleInstance, ModuleInstance } from '@xyo-network/module-model'
import { useState } from 'react'

import { useWeakModuleFilterOptions } from './useWeakModuleFilterOptions'
import { useWeakNode } from './useWeakNode'
import { useWeakModuleFromNodeConfigLogger, WeakModuleFromNodeConfig } from './WeakModuleFromNodeConfig'

export const useWeakModuleFromNode = <T extends ModuleInstance | void = void>(
  nameOrAddressOrInstance: string | (T extends ModuleInstance ? T : ModuleInstance) | undefined = undefined,
  config?: WeakModuleFromNodeConfig,
): [WeakRef<T extends ModuleInstance ? T : ModuleInstance> | undefined, Error | undefined] => {
  const [node, nodeError] = useWeakNode(config)
  const logger = useWeakModuleFromNodeConfigLogger(config)
  const filterOptions = useWeakModuleFilterOptions(config)
  const [result, setResult] = useState<WeakRef<T extends ModuleInstance ? T : ModuleInstance> | undefined>()
  const [, error] = usePromise(async () => {
    logger?.debug('useModuleFromNode: resolving')
    const identity: TypeCheck<T extends ModuleInstance ? T : ModuleInstance> = (config?.identity ?? isModuleInstance) as TypeCheck<
      T extends ModuleInstance ? T : ModuleInstance
    >
    const nodeInstance = node?.deref()
    if (nodeInstance && nameOrAddressOrInstance) {
      nodeInstance.on('moduleAttached', ({ module: mod }) => {
        logger?.debug(`useModuleFromNode: moduleAttached [${mod.config.name ?? mod.address}]`)
        if (mod.address === nameOrAddressOrInstance || mod.config?.name === nameOrAddressOrInstance) {
          setResult(identity(mod) ? new WeakRef(mod as T extends ModuleInstance ? T : ModuleInstance) : undefined)
        }
      })
      nodeInstance.on('moduleDetached', ({ module: mod }) => {
        logger?.debug(`useModuleFromNode: moduleDetached [${mod.config.name ?? mod.address}]`)
        if (mod.address === nameOrAddressOrInstance || mod.config?.name === nameOrAddressOrInstance) {
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
