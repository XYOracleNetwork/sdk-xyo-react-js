import type { WeakModuleFromNodeConfig } from './WeakModuleFromNodeConfig.ts'

// eslint-disable-next-line @eslint-react/hooks-extra/ensure-custom-hooks-using-other-hooks
export const useWeakModuleFilterOptions = (config?: WeakModuleFromNodeConfig) => {
  const {
    direction, identity, maxDepth,
  } = config ?? {}
  return {
    direction, identity, maxDepth,
  }
}
