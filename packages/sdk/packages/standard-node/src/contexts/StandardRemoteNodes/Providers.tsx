import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
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
        const builtNodes = await BuildStandardNodes(wallet)
        setNodes(builtNodes)
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
