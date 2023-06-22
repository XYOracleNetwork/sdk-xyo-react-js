import { NodeModule, NodeWrapper } from '@xyo-network/node'
import { NodeContext } from '@xyo-network/react-node-context'
import { useAccount } from '@xyo-network/react-wallet'
import { WalletInstance } from '@xyo-network/wallet-model'
import { useContext, useEffect, useState } from 'react'

export const useProvidedNode = (): [NodeModule | undefined] => {
  const { node } = useContext(NodeContext)

  return [node]
}

export const useProvidedWrappedNode = (account?: WalletInstance): [NodeWrapper | undefined, Error | undefined] => {
  const [accountToUse] = useAccount({ account })
  const [node] = useProvidedNode()
  const [wrappedNode, setWrappedNode] = useState<NodeWrapper>()
  const [error, setError] = useState<Error>()

  /*
  useEffect(() => {
    if (!accountToUse) {
      const error = Error('useProvidedWrappedNode requires either an Account context or account parameter')
      setError(error)
    }
  }, [accountToUse])
  */

  useEffect(() => {
    try {
      if (node && accountToUse) {
        setWrappedNode(NodeWrapper.wrap(node, accountToUse))
        setError(undefined)
      } else {
        setWrappedNode(undefined)
        setError(undefined)
      }
    } catch (ex) {
      setWrappedNode(undefined)
      setError(ex as Error)
    }
  }, [node, accountToUse])

  return [wrappedNode, error]
}
