import { Node } from '@xyo-network/node'
import { Dispatch } from 'react'

export interface NodeContextState {
  node?: Node
  setNode?: Dispatch<Node>
}
