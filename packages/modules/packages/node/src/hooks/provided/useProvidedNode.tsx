import { NodeModule } from '@xyo-network/node'
import { NodeContext } from '@xyo-network/react-node-context'
import { useContext } from 'react'

export const useProvidedNode = (): [NodeModule | null | undefined] => {
  const { node } = useContext(NodeContext)
  return [node]
}