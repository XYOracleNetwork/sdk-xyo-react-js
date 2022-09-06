import { XyoModule } from '@xyo-network/module'
import { XyoNode } from '@xyo-network/node'
import { Dispatch } from 'react'

export interface XyoNodeContextState<T extends XyoModule = XyoModule> {
  node?: XyoNode<T>
  setNode?: Dispatch<XyoNode<T>>
}
