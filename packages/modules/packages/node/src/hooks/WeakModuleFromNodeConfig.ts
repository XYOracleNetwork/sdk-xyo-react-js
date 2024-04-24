import { Logger } from '@xylabs/logger'
import { ModuleFilterOptions } from '@xyo-network/module-model'
import { NodeInstance } from '@xyo-network/node-model'

export type WeakModuleFromNodeConfig = ModuleFilterOptions & {
  logger?: Logger
  node?: WeakRef<NodeInstance> | string
}

export const useWeakModuleFromNodeConfigLogger = (config?: WeakModuleFromNodeConfig) => {
  return config?.logger
}
