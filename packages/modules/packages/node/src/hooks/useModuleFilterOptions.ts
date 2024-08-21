import type { ModuleFromNodeConfig } from './ModuleFromNodeConfig.ts'

// eslint-disable-next-line @eslint-react/hooks-extra/ensure-custom-hooks-using-other-hooks
export const useModuleFilterOptions = (config?: ModuleFromNodeConfig) => {
  const {
    direction, identity, maxDepth,
  } = config ?? {}
  return {
    direction, identity, maxDepth,
  }
}
