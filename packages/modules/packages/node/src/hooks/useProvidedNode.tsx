import { Account } from '@xyo-network/account'
import { NodeModule, NodeWrapper } from '@xyo-network/node'
import { useContext, useEffect, useState } from 'react'

import { NodeContext } from '../contexts'

function useProvidedNodeFunc(wrap?: undefined): [NodeModule | undefined, Error | undefined]
function useProvidedNodeFunc(wrap: false): [NodeModule | undefined, Error | undefined]
function useProvidedNodeFunc(wrap: true | Account): [NodeWrapper | undefined, Error | undefined]
function useProvidedNodeFunc(wrap: boolean | Account | undefined): [NodeModule | NodeWrapper | undefined, Error | undefined] {
  const { node } = useContext(NodeContext)
  const [wrappedNode, setWrappedNode] = useState<NodeWrapper>()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    try {
      if (node) {
        const account = typeof wrap === 'boolean' ? undefined : wrap
        const wrappedNode = wrap ? NodeWrapper.wrap(node, account) : undefined
        setWrappedNode(wrappedNode)
        setError(undefined)
      }
    } catch (ex) {
      setError(ex as Error)
    }
  }, [node, wrap])

  return [wrap ? wrappedNode : wrappedNode?.module, error]
}

export const useProvidedNode = useProvidedNodeFunc
