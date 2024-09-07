import type { ModuleFromNodeConfig } from './ModuleFromNodeConfig.ts'

export const getModuleFilterOptions = (config?: ModuleFromNodeConfig) => {
  const {
    direction, identity, maxDepth,
  } = config ?? {}
  return {
    direction, identity, maxDepth,
  }
}
