import { usePromise } from '@xylabs/react-promise'
import { isDefined } from '@xylabs/sdk-js'
import type { NodeInstance } from '@xyo-network/node-model'
import { asNodeInstance } from '@xyo-network/node-model'

import { useWeakProvidedNode } from './provided/index.ts'
import { useWeakNodeConfigNodeField } from './useWeakNodeConfigNodeField.ts'
import type { WeakModuleFromNodeConfig } from './WeakModuleFromNodeConfig.ts'

export const useWeakNode = (config?: WeakModuleFromNodeConfig | undefined): [WeakRef<NodeInstance> | undefined, Error | undefined] => {
  const [nodeAddress, nodeInstance] = useWeakNodeConfigNodeField(config)
  const [providedNode] = useWeakProvidedNode()
  const [nodeAddressNode, error] = usePromise(async () => {
    const providedNodeInstance = providedNode?.deref()
    if (providedNodeInstance && isDefined(nodeAddress)) {
      return new WeakRef(asNodeInstance(await providedNodeInstance.resolve(nodeAddress), () => 'Module is not a node', { required: true }))
    }
  }, [providedNode, nodeAddress])
  return [nodeAddressNode ?? nodeInstance ?? providedNode ?? undefined, error]
}
