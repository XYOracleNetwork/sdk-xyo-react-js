import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { assertDefinedEx } from '@xyo-network/react-shared'
import { useWallet } from '@xyo-network/react-wallet'
import { useEffect, useState } from 'react'

import { BuildStandardNodes } from '../../lib'
import { StandardNodesContext } from './Context'
import { StandardNodesState } from './State'

export interface StandardNodesProviderProps extends WithChildren {
  defaultRemoteNodes?: StandardNodesState['nodes']
}

export const StandardNodesProvider: React.FC<StandardNodesProviderProps> = ({ children, defaultRemoteNodes }) => {
  const [nodes, setNodes] = useState<StandardNodesState['nodes']>(defaultRemoteNodes)
  const { wallet, activeAccountIndex } = useWallet()

  useEffect(() => {
    setNodes(defaultRemoteNodes)
  }, [defaultRemoteNodes])

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      if (activeAccountIndex !== undefined && wallet) {
        const remoteNodeWallet = wallet.derivePath(activeAccountIndex.toString())
        const builtNodes = await BuildStandardNodes(remoteNodeWallet)
        setNodes(builtNodes)
      }
    },
    [activeAccountIndex, wallet],
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
