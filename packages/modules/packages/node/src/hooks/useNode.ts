import { usePromise } from '@xylabs/react-promise'
import { asNodeInstance, NodeInstance } from '@xyo-network/node-model'

import { ModuleFromNodeConfig } from './ModuleFromNodeConfig.js'
import { useProvidedNode } from './provided/index.js'
import { useNodeConfigNodeField } from './useNodeConfigNodeField.js'

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
