import type { WeakModuleFromNodeConfig } from './WeakModuleFromNodeConfig.ts'

export const getWeakModuleFilterOptions = (config?: WeakModuleFromNodeConfig) => {
  const {
    direction, identity, maxDepth,
  } = config ?? {}
  return {
    direction, identity, maxDepth,
  }
}
