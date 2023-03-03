import { NodeModule, NodeWrapper } from '@xyo-network/node'
import { useContext } from 'react'

import { NodeContext } from '../../contexts'

function useProvidedNodeFunc(wrap?: false): NodeModule | undefined
function useProvidedNodeFunc(wrap: true): NodeWrapper | undefined
function useProvidedNodeFunc(wrap?: boolean): NodeModule | undefined {
  const { node } = useContext(NodeContext)

  return wrap ? NodeWrapper.wrap(node) : node
}

export const useProvidedNode = useProvidedNodeFunc