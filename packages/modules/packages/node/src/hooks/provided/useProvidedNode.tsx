import type { NodeInstance } from '@xyo-network/node-model'
import { NodeContext } from '@xyo-network/react-node-context'
import { use } from 'react'

export const useProvidedNode = (): [NodeInstance | null | undefined] => {
  const { node } = use(NodeContext)
  return [node]
}
