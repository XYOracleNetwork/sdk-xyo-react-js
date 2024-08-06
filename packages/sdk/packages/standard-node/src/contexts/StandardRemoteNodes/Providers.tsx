import { usePromise } from '@xylabs/react-promise'
import { WithChildren } from '@xylabs/react-shared'
import { MemoryNode } from '@xyo-network/node-memory'
import { assertDefinedEx } from '@xyo-network/react-shared'
import { useWalletContext } from '@xyo-network/react-wallet'
import { WalletInstance } from '@xyo-network/wallet-model'
import React, { useEffect, useMemo, useState } from 'react'

import { BuildStandardNodes } from '../../lib/index.ts'
import { StandardNodesContext } from './Context.ts'
import { StandardNodesState } from './State.ts'

export interface StandardNodesProviderProps extends WithChildren {
  defaultRemoteNodes?: StandardNodesState['nodes']
  wallet?: WalletInstance | null
}

export const StandardNodesProvider: React.FC<StandardNodesProviderProps> = ({ children, defaultRemoteNodes, wallet }) => {
  const [nodes, setNodes] = useState<StandardNodesState['nodes']>(defaultRemoteNodes)

  useEffect(() => {
    setNodes(defaultRemoteNodes)
  }, [defaultRemoteNodes])

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
    const validNetworkName = assertDefinedEx(name, 'name was not defined')
    return nodes?.find(node => node.config.name === validNetworkName)?.address
  }

  const value = useMemo(() => ({ findAddressByName,
    nodes,
    provided: true }), [findAddressByName,
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
