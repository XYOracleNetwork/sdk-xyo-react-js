import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { MemoryNode } from '@xyo-network/node'
import { HDWallet } from '@xyo-network/protocol'
import { assertDefinedEx } from '@xyo-network/react-shared'
import { useWallet } from '@xyo-network/react-wallet'
import { useEffect, useMemo, useState } from 'react'

import { BuildStandardNodes } from '../../lib'
import { StandardNodesContext } from './Context'
import { StandardNodesState } from './State'

export interface StandardNodesProviderProps extends WithChildren {
  defaultRemoteNodes?: StandardNodesState['nodes']
  wallet?: HDWallet
}

export const StandardNodesProvider: React.FC<StandardNodesProviderProps> = ({ children, defaultRemoteNodes, wallet }) => {
  const [nodes, setNodes] = useState<StandardNodesState['nodes']>(defaultRemoteNodes)

  useEffect(() => {
    setNodes(defaultRemoteNodes)
  }, [defaultRemoteNodes])

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
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
    },
    [wallet],
  )

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
  const { wallet: walletFromCtx, activeAccountIndex } = useWallet()
  const wallet = useMemo(
    () => (walletFromCtx && activeAccountIndex !== undefined ? walletFromCtx.derivePath(activeAccountIndex.toString()) : undefined),
    [activeAccountIndex, walletFromCtx],
  )
  return <StandardNodesProvider wallet={wallet} {...props} />
}
