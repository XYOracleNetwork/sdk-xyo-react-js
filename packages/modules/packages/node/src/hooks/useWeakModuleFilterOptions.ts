import { WeakModuleFromNodeConfig } from './WeakModuleFromNodeConfig.ts'

export const useWeakModuleFilterOptions = (config?: WeakModuleFromNodeConfig) => {
  const { direction, identity, maxDepth } = config ?? {}
  return { direction, identity, maxDepth }
}
