import { NodeModule } from '@xyo-network/node'
import { Dispatch } from 'react'

export interface NodeContextState {
  node?: NodeModule
  setNode?: Dispatch<NodeModule>
}
