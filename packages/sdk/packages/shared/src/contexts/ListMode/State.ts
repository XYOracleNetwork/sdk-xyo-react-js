import { Dispatch } from 'react'

import { ListMode } from '../../models/index.js'
import { ContextExState } from '../contextEx/index.js'

export interface ListModeContextState extends ContextExState {
  listMode: ListMode
  setListMode?: Dispatch<ListMode>
}
