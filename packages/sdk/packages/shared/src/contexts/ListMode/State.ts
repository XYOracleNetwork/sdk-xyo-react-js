import { Dispatch } from 'react'

import { ListMode } from '../../models/index.ts'
import { ContextExState } from '../contextEx/index.ts'

export interface ListModeContextState extends ContextExState {
  listMode: ListMode
  setListMode?: Dispatch<ListMode>
}
