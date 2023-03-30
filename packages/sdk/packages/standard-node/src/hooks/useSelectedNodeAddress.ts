import { useNetwork } from '@xyo-network/react-network'
import { useProvidedNode } from '@xyo-network/react-node'
import { useMemo } from 'react'

import { useStandardNodes } from '../contexts'

export const useSelectedNodeAddress = () => {
  const { network } = useNetwork()
  const [node] = useProvidedNode()
  const { nodes, findAddressByName } = useStandardNodes()

  const selectedNodeAddress = useMemo(() => {
    if (node && nodes && findAddressByName && network) {
      return findAddressByName(network.name)
    }
  }, [findAddressByName, network, node, nodes])

  return selectedNodeAddress
}
