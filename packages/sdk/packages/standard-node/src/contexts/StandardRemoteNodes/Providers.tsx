import { usePromise } from '@xylabs/react-promise'
import { WithChildren } from '@xylabs/react-shared'
import { MemoryNode } from '@xyo-network/node'
import { assertDefinedEx } from '@xyo-network/react-shared'
import { useWalletContext } from '@xyo-network/react-wallet'
import { WalletInstance } from '@xyo-network/wallet-model'
import { useEffect, useState } from 'react'

import { BuildStandardNodes } from '../../lib'
import { StandardNodesContext } from './Context'
import { StandardNodesState } from './State'

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
          if (nodes?.find((existingNode) => existingNode.config.name === node.config.name)) {
            return undefined
          }
          return nodes ? [...nodes, node] : [node]
        })
      })
    }
  }, [wallet])

  const findAddressByName = (name?: string) => {
    const validNetworkName = assertDefinedEx(name, 'name was not defined')
    return nodes?.find((node) => node.config.name === validNetworkName)?.address
  }

  return (
    <StandardNodesContext.Provider
      value={{
        findAddressByName,
        nodes,
        provided: true,
      }}
    >
      {children}
    </StandardNodesContext.Provider>
  )
}

export const StandardNodesProviderWithWallet: React.FC<Omit<StandardNodesProviderProps, 'wallet'>> = (props) => {
  const { activeAccount } = useWalletContext()
  return <StandardNodesProvider wallet={activeAccount} {...props} />
}
