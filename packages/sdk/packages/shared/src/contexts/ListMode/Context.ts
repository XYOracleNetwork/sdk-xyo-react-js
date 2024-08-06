import { createContextEx } from '../contextEx/index.ts'
import { ListModeContextState } from './State.ts'

export const ListModeContext = createContextEx<ListModeContextState>()
