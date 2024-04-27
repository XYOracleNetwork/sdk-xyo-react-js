import { usePromise } from '@xylabs/react-promise'
import { asNodeInstance, NodeInstance } from '@xyo-network/node-model'

import { useWeakProvidedNode } from './provided'
import { useWeakNodeConfigNodeField } from './useWeakNodeConfigNodeField'
import { WeakModuleFromNodeConfig } from './WeakModuleFromNodeConfig'

export const useWeakNode = (config?: WeakModuleFromNodeConfig | undefined): [WeakRef<NodeInstance> | undefined, Error | undefined] => {
  const [nodeAddress, nodeInstance] = useWeakNodeConfigNodeField(config)
  const [providedNode] = useWeakProvidedNode()
  const [nodeAddressNode, error] = usePromise(async () => {
    const providedNodeInstance = providedNode?.deref()
    if (providedNodeInstance && nodeAddress) {
      return new WeakRef(asNodeInstance(await providedNodeInstance.resolve(nodeAddress), 'Module is not a node'))
    }
  }, [providedNode, nodeAddress])
  return [nodeAddressNode ?? nodeInstance ?? providedNode ?? undefined, error]
}
