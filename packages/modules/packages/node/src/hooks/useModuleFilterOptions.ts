import { ModuleFromNodeConfig } from './ModuleFromNodeConfig'

export const useModuleFilterOptions = (config?: ModuleFromNodeConfig) => {
  const { direction, identity, maxDepth, visibility } = config ?? {}
  return { direction, identity, maxDepth, visibility }
}
