import { NodeModule, NodeWrapper } from '@xyo-network/node'
import { useContext, useState } from 'react'

import { NodeContext } from '../contexts'

function useProvidedNodeFunc(wrap?: undefined): [NodeModule | undefined, Error | undefined]
function useProvidedNodeFunc(wrap: false): [NodeModule | undefined, Error | undefined]
function useProvidedNodeFunc(wrap: true): [NodeWrapper | undefined, Error | undefined]
function useProvidedNodeFunc(wrap: true | false | undefined): [NodeModule | NodeWrapper | undefined, Error | undefined] {
  const { node } = useContext(NodeContext)
  const [wrappedNode, setWrappedNode] = useState<NodeWrapper>()
  const [error, setError] = useState<Error>()

  try {
    if (wrap) {
      const wrappedNode = wrap ? NodeWrapper.wrap(node) : undefined
      setWrappedNode(wrappedNode)
      setError(undefined)
    }
  } catch (ex) {
    setError(ex as Error)
  }
  return [wrap ? wrappedNode : node, error]
}

export const useProvidedNode = useProvidedNodeFunc
