import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { useNetwork } from '@xyo-network/react-network'
import { useNode } from '@xyo-network/react-node'
import { useMemo, useState } from 'react'

import { useStandardNodes } from '../contexts'

export interface ActiveStandardNodeProps extends WithChildren {
  nodeNameOrAddress?: string
}

export const ActiveStandardNode: React.FC<ActiveStandardNodeProps> = ({ children, nodeNameOrAddress }) => {
  const { network } = useNetwork(true)
  const [node] = useNode(nodeNameOrAddress)
  const [activeRemoteNodeAddress, setActiveRemoteNodeAddress] = useState<string>()
  const { nodes, findAddressByName } = useStandardNodes()

  const selectedNodeAddress = useMemo(() => {
    if (node && nodes && findAddressByName && network) {
      return findAddressByName(network.name)
    }
  }, [findAddressByName, network, node, nodes])

  // Probably needs to rely on node events rather than provider values to ensure its registered
  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (node && selectedNodeAddress) {
        try {
          if ((await node?.attached())?.includes(selectedNodeAddress)) {
            return
          }
          await node?.attach(selectedNodeAddress, true)

          if (mounted()) {
            // cleanup
            if (activeRemoteNodeAddress) {
              await node?.detach(activeRemoteNodeAddress)
            }
            setActiveRemoteNodeAddress(selectedNodeAddress)
          }
        } catch (e) {
          console.error('Error Attaching Selected Node Address', e)
        }
      }
    },
    [activeRemoteNodeAddress, node, selectedNodeAddress, nodes],
  )

  return <>{children}</>
}
