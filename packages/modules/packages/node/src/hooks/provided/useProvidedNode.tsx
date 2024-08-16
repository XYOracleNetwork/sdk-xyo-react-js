import type { NodeInstance } from '@xyo-network/node-model'
import { NodeContext } from '@xyo-network/react-node-context'
import { useContext } from 'react'

export const useProvidedNode = (): [NodeInstance | null | undefined] => {
  const { node } = useContext(NodeContext)
  return [node]
}
