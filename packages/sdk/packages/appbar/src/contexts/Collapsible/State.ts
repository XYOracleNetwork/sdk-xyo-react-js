import { ContextExState } from '@xyo-network/react-shared'
import { Dispatch, SetStateAction } from 'react'

export interface CollapsibleState extends ContextExState {
  collapse?: boolean
  setCollapse?: Dispatch<SetStateAction<boolean>>
  collapseEnd?: boolean
  setCollapseEnd?: Dispatch<SetStateAction<boolean>>
}
