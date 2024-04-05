import { ModuleFromNodeConfig } from './ModuleFromNodeConfig'

export const useModuleFilterOptions = (config?: ModuleFromNodeConfig) => {
  const { direction, identity, maxDepth } = config ?? {}
  return { direction, identity, maxDepth }
}
