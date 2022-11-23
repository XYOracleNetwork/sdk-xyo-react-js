import { AbstractNode } from '@xyo-network/node'
import { Dispatch } from 'react'

export interface NodeContextState {
  node?: AbstractNode
  setNode?: Dispatch<AbstractNode>
}
