import { Dispatch } from 'react'

import { ListMode } from '../../models'
import { ContextExState } from '../contextEx'

export interface ListModeContextState extends ContextExState {
  listMode?: ListMode
  setListMode?: Dispatch<ListMode>
}
