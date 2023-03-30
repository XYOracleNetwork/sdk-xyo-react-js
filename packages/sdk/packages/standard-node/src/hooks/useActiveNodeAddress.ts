import { useProvidedNode } from '@xyo-network/react-node'
import { useMemo } from 'react'

import { useStandardNodes } from '../contexts'

export const useActiveNodeAddress = (networkName?: string) => {
  const [node] = useProvidedNode()
  const { nodes, findAddressByName } = useStandardNodes()

  const activeNodeAddress = useMemo(() => {
    if (node && nodes && findAddressByName && networkName) {
      return findAddressByName(networkName)
    }
  }, [findAddressByName, networkName, node, nodes])

  return activeNodeAddress
}
