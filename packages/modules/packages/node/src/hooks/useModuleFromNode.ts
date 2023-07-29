import { usePromise } from '@xylabs/react-promise'
import { Logger } from '@xyo-network/logger'
import { asModuleInstance } from '@xyo-network/module'
import { ModuleFilterOptions, ModuleInstance } from '@xyo-network/module-model'
import { NodeInstance } from '@xyo-network/node'
import { useState } from 'react'

import { useProvidedNode } from './provided'

export type ModuleFromNodeConfig = ModuleFilterOptions & {
  logger?: Logger
  node?: NodeInstance
}

export const useModuleFromNode = (nameOrAddress?: string, config?: ModuleFromNodeConfig): [ModuleInstance | undefined, Error | undefined] => {
  const [providedNode] = useProvidedNode()
  const { logger, node: paramNode, ...resolveConfig } = config ?? {}
  const [result, setResult] = useState<ModuleInstance | undefined>()
  const [, error] = usePromise(async () => {
    logger?.debug('useModuleFromNode: resolving')
    const activeNode = paramNode ?? providedNode
    if (activeNode && nameOrAddress) {
      activeNode.on('moduleAttached', ({ module }) => {
        logger?.debug(`useModuleFromNode: moduleAttached [${module.config.name ?? module.address}]`)
        if (module.address === nameOrAddress || module.config?.name === nameOrAddress) {
          setResult(asModuleInstance(module))
        }
      })
      activeNode.on('moduleDetached', ({ module }) => {
        logger?.debug(`useModuleFromNode: moduleDetached [${module.config.name ?? module.address}]`)
        if (module.address === nameOrAddress || module.config?.name === nameOrAddress) {
          setResult(undefined)
        }
      })
      const result = await activeNode.resolve(nameOrAddress, resolveConfig)
      logger?.debug(`Result: ${result?.address}`)
      setResult(result)
      return result
    }
    logger?.debug('Result: No Node')
    return undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramNode, providedNode, nameOrAddress])
  return [result, error]
}
