/* eslint-disable deprecation/deprecation */
/* eslint-disable import/no-deprecated */
import { NodeInstance } from '@xyo-network/node-model'
import { useMemo } from 'react'

import { ModuleFromNodeConfig } from './ModuleFromNodeConfig.js'

export const useNodeConfigNodeField = (config?: ModuleFromNodeConfig | undefined): [string | undefined, NodeInstance | undefined] => {
  const nodeAddress = useMemo(() => (typeof config?.node === 'string' ? config?.node : undefined), [config?.node])
  const nodeInstance = useMemo(() => (typeof config?.node === 'object' ? config?.node : undefined), [config?.node])
  return [nodeAddress, nodeInstance]
}
