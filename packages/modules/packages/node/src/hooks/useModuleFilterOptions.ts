/* eslint-disable deprecation/deprecation */

import { ModuleFromNodeConfig } from './ModuleFromNodeConfig.tsx'

export const useModuleFilterOptions = (config?: ModuleFromNodeConfig) => {
  const { direction, identity, maxDepth } = config ?? {}
  return { direction, identity, maxDepth }
}
