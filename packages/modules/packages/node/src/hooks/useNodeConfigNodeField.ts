import type { NodeInstance } from '@xyo-network/node-model'
import { useMemo } from 'react'

import type { ModuleFromNodeConfig } from './ModuleFromNodeConfig.ts'

export const useNodeConfigNodeField = (config?: ModuleFromNodeConfig | undefined): [string | undefined, NodeInstance | undefined] => {
  const nodeAddress = useMemo(() => (typeof config?.node === 'string' ? config?.node : undefined), [config?.node])
  const nodeInstance = useMemo(() => (typeof config?.node === 'object' ? config?.node : undefined), [config?.node])
  return [nodeAddress, nodeInstance]
}
