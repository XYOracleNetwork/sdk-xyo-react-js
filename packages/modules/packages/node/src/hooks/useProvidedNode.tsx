import { AccountInstance } from '@xyo-network/account-model'
import { NodeModule, NodeWrapper } from '@xyo-network/node'
import { useAccount } from '@xyo-network/react-wallet'
import { useContext, useEffect, useMemo, useState } from 'react'

import { NodeContext } from '../contexts'

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

  if (!accountToUse) {
    const error = Error('useProvidedWrappedNode requires either an Account context or account parameter')
    console.error(error.message)
    setError(error)
  }

  useEffect(() => {
    try {
      if (node && accountToUse) {
        setWrappedNode(NodeWrapper.wrap(node, account))
        setError(undefined)
      }
    } catch (ex) {
      setWrappedNode(undefined)
      setError(ex as Error)
    }
  }, [node, account, accountToUse])

  return [wrappedNode, error]
}
