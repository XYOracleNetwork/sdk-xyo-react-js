import { assertDefinedEx } from '@xylabs/assert'
import { useResetState } from '@xylabs/react-hooks'
import { usePromise } from '@xylabs/react-promise'
import type { WithChildren } from '@xylabs/react-shared'
import type { MemoryNode } from '@xyo-network/node-memory'
import { useWalletContext } from '@xyo-network/react-wallet'
import type { WalletInstance } from '@xyo-network/wallet-model'
import React, { useMemo } from 'react'

import { BuildStandardNodes } from '../../lib/index.ts'
import { StandardNodesContext } from './Context.ts'
import type { StandardNodesState } from './State.ts'

export interface StandardNodesProviderProps extends WithChildren {
  defaultRemoteNodes?: StandardNodesState['nodes']
  wallet?: WalletInstance | null
}

export const StandardNodesProvider: React.FC<StandardNodesProviderProps> = ({
  children, defaultRemoteNodes, wallet,
}) => {
  const [nodes, setNodes] = useResetState<StandardNodesState['nodes']>(defaultRemoteNodes)

  usePromise(async () => {
    if (wallet) {
      await BuildStandardNodes(wallet, (node: MemoryNode) => {
        setNodes((nodes) => {
          if (nodes?.find(existingNode => existingNode.config.name === node.config.name)) {
            return
          }
          return nodes ? [...nodes, node] : [node]
        })
      })
    }
  }, [wallet])

  const findAddressByName = (name?: string) => {
    const validNetworkName = assertDefinedEx(name, () => 'name was not defined')
    return nodes?.find(node => node.config.name === validNetworkName)?.address
  }

  const value = useMemo(() => ({
    findAddressByName,
    nodes,
    provided: true,
  }), [findAddressByName,
    nodes])

  return (
    <StandardNodesContext.Provider
      value={value}
    >
      {children}
    </StandardNodesContext.Provider>
  )
}

export const StandardNodesProviderWithWallet: React.FC<Omit<StandardNodesProviderProps, 'wallet'>> = (props) => {
  const { activeAccount } = useWalletContext()
  return <StandardNodesProvider wallet={activeAccount} {...props} />
}
