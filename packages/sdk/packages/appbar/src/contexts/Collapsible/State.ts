import type { ContextExState } from '@xyo-network/react-shared'
import type { Dispatch, SetStateAction } from 'react'

export interface CollapsibleState extends ContextExState {
  collapse?: boolean
  collapseEnd?: boolean
  setCollapse?: Dispatch<SetStateAction<boolean>>
  setCollapseEnd?: Dispatch<SetStateAction<boolean>>
}
