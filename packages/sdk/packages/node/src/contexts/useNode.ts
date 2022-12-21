import { AbstractNode, Node } from '@xyo-network/node'
import { useContextEx } from '@xyo-network/react-shared'
import { Dispatch } from 'react'

import { NodeContext } from './Context'

export const useNode = <T extends Node = Node>(): [T | undefined, Dispatch<AbstractNode> | undefined] => {
  const { node, setNode } = useContextEx(NodeContext, 'XyoNode')

  return [node as T, setNode]
}
