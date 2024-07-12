/* eslint-disable deprecation/deprecation */
/* eslint-disable import/no-deprecated */
import { ModuleFromNodeConfig } from './ModuleFromNodeConfig.js'

export const useModuleFilterOptions = (config?: ModuleFromNodeConfig) => {
  const { direction, identity, maxDepth } = config ?? {}
  return { direction, identity, maxDepth }
}
