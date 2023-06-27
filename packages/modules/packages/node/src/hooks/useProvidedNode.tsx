import { NodeModule, NodeWrapper } from '@xyo-network/node'
import { NodeContext } from '@xyo-network/react-node-context'
import { useWallet } from '@xyo-network/react-wallet'
import { WalletInstance } from '@xyo-network/wallet-model'
import { useContext, useEffect, useState } from 'react'

export const useProvidedNode = (): [NodeModule | undefined] => {
  const { node } = useContext(NodeContext)

  return [node]
}

export const useProvidedWrappedNode = (wallet?: WalletInstance): [NodeWrapper | undefined, Error | undefined] => {
  const [walletToUse] = useWallet({ wallet })
  const [node] = useProvidedNode()
  const [wrappedNode, setWrappedNode] = useState<NodeWrapper>()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    try {
      if (node && walletToUse) {
        setWrappedNode(NodeWrapper.wrap(node, walletToUse))
        setError(undefined)
      } else {
        setWrappedNode(undefined)
        setError(undefined)
      }
    } catch (ex) {
      setWrappedNode(undefined)
      setError(ex as Error)
    }
  }, [node, walletToUse])

  return [wrappedNode, error]
}
