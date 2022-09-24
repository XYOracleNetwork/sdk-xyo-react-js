import { XyoNode } from '@xyo-network/node'
import { Dispatch } from 'react'

export interface NodeContextState {
  node?: XyoNode
  setNode?: Dispatch<XyoNode>
}
