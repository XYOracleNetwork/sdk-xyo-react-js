import { usePromise } from '@xylabs/react-promise'
import { Logger } from '@xyo-network/logger'
import { asModuleInstance } from '@xyo-network/module'
import { ModuleFilterOptions, ModuleInstance } from '@xyo-network/module-model'
import { NodeInstance } from '@xyo-network/node-model'
import { useState } from 'react'

import { useModuleFilterOptions } from './useModuleFilterOptions'
import { useNode } from './useNode'

export type ModuleFromNodeConfig = ModuleFilterOptions & {
  logger?: Logger
  node?: NodeInstance | string
}

export const useModuleFromNodeConfigLogger = (config?: ModuleFromNodeConfig) => {
  return config?.logger
}

export const useModuleFromNode = (nameOrAddress?: string, config?: ModuleFromNodeConfig): [ModuleInstance | undefined, Error | undefined] => {
  console.log('useModuleFromNode')
  const [node, nodeError] = useNode(config)
  const logger = useModuleFromNodeConfigLogger(config)
  const filterOptions = useModuleFilterOptions(config)
  const [result, setResult] = useState<ModuleInstance | undefined>()
  const [, error] = usePromise(async () => {
    logger?.debug('useModuleFromNode: resolving')
    if (node && nameOrAddress) {
      node.on('moduleAttached', ({ module }) => {
        logger?.debug(`useModuleFromNode: moduleAttached [${module.config.name ?? module.address}]`)
        if (module.address === nameOrAddress || module.config?.name === nameOrAddress) {
          setResult(asModuleInstance(module))
        }
      })
      node.on('moduleDetached', ({ module }) => {
        logger?.debug(`useModuleFromNode: moduleDetached [${module.config.name ?? module.address}]`)
        if (module.address === nameOrAddress || module.config?.name === nameOrAddress) {
          setResult(undefined)
        }
      })
      const result = await node.resolve(nameOrAddress, filterOptions)
      logger?.debug(`Result: ${result?.address}`)
      setResult(result)
      return result
    }
    logger?.debug('Result: No Node')
    return undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node, nameOrAddress])
  return [result, nodeError ?? error]
}
