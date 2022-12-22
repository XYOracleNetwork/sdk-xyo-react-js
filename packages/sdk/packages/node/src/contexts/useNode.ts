import { NodeModule } from '@xyo-network/node'
import { useContextEx } from '@xyo-network/react-shared'
import { Dispatch } from 'react'

import { NodeContext } from './Context'

export const useNode = <T extends NodeModule = NodeModule>(): [T | undefined, Dispatch<NodeModule> | undefined] => {
  const { node, setNode } = useContextEx(NodeContext, 'XyoNode')

  return [node as T, setNode]
}
