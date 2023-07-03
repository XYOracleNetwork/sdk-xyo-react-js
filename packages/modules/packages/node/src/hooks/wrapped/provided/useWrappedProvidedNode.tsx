import { NodeWrapper } from '@xyo-network/node'
import { useWallet } from '@xyo-network/react-wallet'
import { WalletInstance } from '@xyo-network/wallet-model'
import { useEffect, useState } from 'react'

import { useProvidedNode } from '../../provided'

export const useWrappedProvidedNode = (wallet?: WalletInstance | null): [NodeWrapper | undefined, Error | undefined] => {
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
