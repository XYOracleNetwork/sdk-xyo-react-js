import { useAsyncEffect } from '@xylabs/react-async-effect'
import { WithChildren } from '@xylabs/react-shared'
import { useNetwork } from '@xyo-network/react-network'
import { useWeakNodeFromNode } from '@xyo-network/react-node'
import { useState } from 'react'

import { useStandardNodes } from '../contexts/index.js'
import { useActiveNodeAddress } from '../hooks/index.js'

export interface ActiveStandardNodeProps extends WithChildren {
  nodeNameOrAddress?: string
}

export const ActiveStandardNode: React.FC<ActiveStandardNodeProps> = ({ children, nodeNameOrAddress }) => {
  const { network } = useNetwork()
  const [node] = useWeakNodeFromNode(nodeNameOrAddress)
  const [activeRemoteNodeAddress, setActiveRemoteNodeAddress] = useState<string>()
  const { nodes } = useStandardNodes()

  const selectedNodeAddress = useActiveNodeAddress(network?.name)

  // Probably needs to rely on node events rather than provider values to ensure its registered
  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const nodeInstance = node?.deref()
      if (nodeInstance && selectedNodeAddress) {
        try {
          if ((await nodeInstance?.attached())?.includes(selectedNodeAddress)) {
            return
          }
          await nodeInstance?.attach(selectedNodeAddress, true)

          if (mounted()) {
            // cleanup
            if (activeRemoteNodeAddress) {
              await nodeInstance?.detach(activeRemoteNodeAddress)
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
