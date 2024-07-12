/* eslint-disable import/no-deprecated */
/* eslint-disable deprecation/deprecation */
import { TypeCheck } from '@xylabs/object'
import { usePromise } from '@xylabs/react-promise'
import { isModuleInstance, ModuleInstance } from '@xyo-network/module-model'
import { useState } from 'react'

import { ModuleFromNodeConfig, useModuleFromNodeConfigLogger } from './ModuleFromNodeConfig.js'
import { useModuleFilterOptions } from './useModuleFilterOptions.js'
import { useNode } from './useNode.js'

/** @deprecated use useWeakModuleFromNode */
export const useModuleFromNode = <T extends ModuleInstance | void = void>(
  nameOrAddressOrInstance: string | (T extends ModuleInstance ? T : ModuleInstance) | undefined = undefined,
  config?: T extends ModuleInstance ? ModuleFromNodeConfig<T> : ModuleFromNodeConfig | undefined,
): [(T extends ModuleInstance ? T : ModuleInstance) | undefined, Error | undefined] => {
  const [node, nodeError] = useNode(config)
  const logger = useModuleFromNodeConfigLogger(config)
  const filterOptions = useModuleFilterOptions(config)
  const [result, setResult] = useState<(T extends ModuleInstance ? T : ModuleInstance) | undefined>()
  const [, error] = usePromise(async () => {
    logger?.debug('useModuleFromNode: resolving')
    const identity: TypeCheck<T extends ModuleInstance ? T : ModuleInstance> = (config?.identity ?? isModuleInstance) as TypeCheck<
      T extends ModuleInstance ? T : ModuleInstance
    >
    if (node && nameOrAddressOrInstance) {
      node.on('moduleAttached', ({ mod }) => {
        logger?.debug(`useModuleFromNode: moduleAttached [${mod.config.name ?? mod.address}]`)
        if (mod.address === nameOrAddressOrInstance || mod.config?.name === nameOrAddressOrInstance) {
          setResult(identity(mod) ? (mod as T extends ModuleInstance ? T : ModuleInstance) : undefined)
        }
      })
      node.on('moduleDetached', ({ mod }) => {
        logger?.debug(`useModuleFromNode: moduleDetached [${mod.config.name ?? mod.address}]`)
        if (mod.address === nameOrAddressOrInstance || mod.config?.name === nameOrAddressOrInstance) {
          setResult(undefined)
        }
      })
      if (identity(nameOrAddressOrInstance)) {
        setResult(nameOrAddressOrInstance)
      } else {
        const result = await node.resolve(nameOrAddressOrInstance, filterOptions)
        logger?.debug(`Result: ${result?.address}`)
        setResult(identity(result) ? (result as T extends ModuleInstance ? T : ModuleInstance) : undefined)
      }
      return result
    }
    logger?.debug('Result: No Node')
    return
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node, nameOrAddressOrInstance])
  return [result, nodeError ?? error]
}
