import { XyoNode } from '@xyo-network/node'
import { Dispatch } from 'react'

export interface XyoNodeContextState {
  node?: XyoNode
  setNode?: Dispatch<XyoNode>
}
