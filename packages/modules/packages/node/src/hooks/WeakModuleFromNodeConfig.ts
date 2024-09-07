import type { Logger } from '@xylabs/logger'
import type { ModuleFilterOptions } from '@xyo-network/module-model'
import type { NodeInstance } from '@xyo-network/node-model'

export type WeakModuleFromNodeConfig = ModuleFilterOptions & {
  logger?: Logger
  node?: WeakRef<NodeInstance> | string
}

export const getWeakModuleFromNodeConfigLogger = (config?: WeakModuleFromNodeConfig) => {
  return config?.logger
}
