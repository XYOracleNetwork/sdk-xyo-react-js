import { useAsyncEffect } from '@xylabs/react-async-effect'
import { WithChildren } from '@xylabs/react-shared'
import { useNetwork } from '@xyo-network/react-network'
import { useNodeFromNode } from '@xyo-network/react-node'
import { useState } from 'react'

import { useStandardNodes } from '../contexts'
import { useActiveNodeAddress } from '../hooks'

export interface ActiveStandardNodeProps extends WithChildren {
  nodeNameOrAddress?: string
}

export const ActiveStandardNode: React.FC<ActiveStandardNodeProps> = ({ children, nodeNameOrAddress }) => {
  const { network } = useNetwork()
  const [node] = useNodeFromNode(nodeNameOrAddress)
  const [activeRemoteNodeAddress, setActiveRemoteNodeAddress] = useState<string>()
  const { nodes } = useStandardNodes()

  const selectedNodeAddress = useActiveNodeAddress(network?.name)

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
