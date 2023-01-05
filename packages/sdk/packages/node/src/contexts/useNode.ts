import { NodeModule } from '@xyo-network/node'
import { useContextEx } from '@xyo-network/react-shared'
import { Dispatch } from 'react'

import { NodeContext } from './Context'

export const useNode = <T extends NodeModule = NodeModule>(required = true): [T | undefined, Dispatch<NodeModule> | undefined] => {
  const { node, setNode } = useContextEx(NodeContext, 'Node', required)

  return [node as T, setNode]
}
