import { usePromise } from '@xylabs/react-promise'
import type { NodeInstance } from '@xyo-network/node-model'
import { asNodeInstance } from '@xyo-network/node-model'

import type { ModuleFromNodeConfig } from './ModuleFromNodeConfig.ts'
import { useProvidedNode } from './provided/index.ts'
import { useNodeConfigNodeField } from './useNodeConfigNodeField.ts'

export const useNode = (config?: ModuleFromNodeConfig | undefined): [NodeInstance | undefined, Error | undefined] => {
  const [nodeAddress, nodeInstance] = useNodeConfigNodeField(config)
  const [providedNode] = useProvidedNode()
  const [nodeAddressNode, error] = usePromise(async () => {
    if (providedNode && nodeAddress) {
      return asNodeInstance(await providedNode.resolve(nodeAddress), 'Module is not a node')
    }
  }, [providedNode, nodeAddress])
  return [nodeAddressNode ?? nodeInstance ?? providedNode ?? undefined, error]
}
