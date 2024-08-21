import type { Logger } from '@xylabs/logger'
import type { ModuleFilterOptions } from '@xyo-network/module-model'
import type { NodeInstance } from '@xyo-network/node-model'

export type WeakModuleFromNodeConfig = ModuleFilterOptions & {
  logger?: Logger
  node?: WeakRef<NodeInstance> | string
}

// eslint-disable-next-line @eslint-react/hooks-extra/ensure-custom-hooks-using-other-hooks
export const useWeakModuleFromNodeConfigLogger = (config?: WeakModuleFromNodeConfig) => {
  return config?.logger
}
