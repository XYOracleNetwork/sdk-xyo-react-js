import { AbstractNode } from '@xyo-network/node'
import { useContextEx } from '@xyo-network/react-shared'
import { Dispatch } from 'react'

import { NodeContext } from './Context'

export const useNode = (): [AbstractNode | undefined, Dispatch<AbstractNode> | undefined] => {
  const { node, setNode } = useContextEx(NodeContext, 'XyoNode')

  return [node, setNode]
}
