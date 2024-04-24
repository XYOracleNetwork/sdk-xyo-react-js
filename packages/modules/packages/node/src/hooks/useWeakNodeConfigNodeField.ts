import { NodeInstance } from '@xyo-network/node-model'
import { useMemo } from 'react'

import { WeakModuleFromNodeConfig } from './WeakModuleFromNodeConfig'

export const useWeakNodeConfigNodeField = (
  config?: WeakModuleFromNodeConfig | undefined,
): [string | undefined, WeakRef<NodeInstance> | undefined] => {
  const nodeAddress = useMemo(() => (typeof config?.node === 'string' ? config?.node : undefined), [config?.node])
  const nodeInstance = useMemo(() => (typeof config?.node === 'object' ? config?.node : undefined), [config?.node])
  return [nodeAddress, nodeInstance]
}
