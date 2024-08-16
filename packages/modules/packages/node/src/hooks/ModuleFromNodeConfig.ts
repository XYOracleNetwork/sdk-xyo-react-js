import type { Logger } from '@xylabs/logger'
import type { ModuleFilterOptions, ModuleInstance } from '@xyo-network/module-model'
import type { NodeInstance } from '@xyo-network/node-model'

export type ModuleFromNodeConfig<T extends ModuleInstance = ModuleInstance> = ModuleFilterOptions<T> & {
  logger?: Logger
  node?: NodeInstance | string
}

export const useModuleFromNodeConfigLogger = (config?: ModuleFromNodeConfig) => {
  return config?.logger
}
