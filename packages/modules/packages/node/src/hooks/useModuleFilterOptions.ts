import { ModuleFromNodeConfig } from './ModuleFromNodeConfig.ts'

export const useModuleFilterOptions = (config?: ModuleFromNodeConfig) => {
  const { direction, identity, maxDepth } = config ?? {}
  return { direction, identity, maxDepth }
}
