import type { TypeCheck } from '@xylabs/object'
import { usePromise } from '@xylabs/react-promise'
import type { ModuleInstance } from '@xyo-network/module-model'
import { isModuleInstance } from '@xyo-network/module-model'
import { useState } from 'react'

import { getModuleFilterOptions } from './getModuleFilterOptions.ts'
import type { ModuleFromNodeConfig } from './ModuleFromNodeConfig.ts'
import { getModuleFromNodeConfigLogger } from './ModuleFromNodeConfig.ts'
import { useNode } from './useNode.ts'

/** @deprecated use useWeakModuleFromNode */
export const useModuleFromNode = <T extends ModuleInstance | void = void>(
  nameOrAddressOrInstance: string | (T extends ModuleInstance ? T : ModuleInstance) | undefined = undefined,
  config?: T extends ModuleInstance ? ModuleFromNodeConfig<T> : ModuleFromNodeConfig | undefined,
): [(T extends ModuleInstance ? T : ModuleInstance) | undefined, Error | undefined] => {
  const [node, nodeError] = useNode(config)
  const logger = getModuleFromNodeConfigLogger(config)
  const filterOptions = getModuleFilterOptions(config)
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
  }, [node, nameOrAddressOrInstance])
  return [result, nodeError ?? error]
}
