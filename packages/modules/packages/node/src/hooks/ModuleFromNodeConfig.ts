import { Logger } from '@xylabs/logger'
import { ModuleFilterOptions } from '@xyo-network/module-model'
import { NodeInstance } from '@xyo-network/node-model'

export type ModuleFromNodeConfig = ModuleFilterOptions & {
  logger?: Logger
  node?: NodeInstance | string
}

export const useModuleFromNodeConfigLogger = (config?: ModuleFromNodeConfig) => {
  return config?.logger
}
