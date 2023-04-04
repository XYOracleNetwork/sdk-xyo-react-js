import { AccountInstance } from '@xyo-network/account-model'
import { NodeModule, NodeWrapper } from '@xyo-network/node'
import { NodeContext } from '@xyo-network/react-node-context'
import { useAccount } from '@xyo-network/react-wallet'
import { useContext, useEffect, useMemo, useState } from 'react'

export const useProvidedNode = (): [NodeModule | undefined] => {
  const { node } = useContext(NodeContext)

  return [node]
}

export const useProvidedWrappedNode = (account?: AccountInstance): [NodeWrapper | undefined, Error | undefined] => {
  const [providedAccount] = useAccount()
  const [node] = useProvidedNode()
  const [wrappedNode, setWrappedNode] = useState<NodeWrapper>()
  const [error, setError] = useState<Error>()

  const accountToUse = useMemo(() => account ?? providedAccount, [account, providedAccount])

  useEffect(() => {
    if (!accountToUse) {
      const error = Error('useProvidedWrappedNode requires either an Account context or account parameter')
      setError(error)
    }
  }, [accountToUse])

  useEffect(() => {
    try {
      if (node && accountToUse) {
        setWrappedNode(NodeWrapper.wrap(node, accountToUse))
        setError(undefined)
      }
    } catch (ex) {
      setWrappedNode(undefined)
      setError(ex as Error)
    }
  }, [node, accountToUse])

  return [wrappedNode, error]
}
