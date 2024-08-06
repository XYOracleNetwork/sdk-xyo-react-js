import { useContextEx } from '../contextEx/index.ts'
import { ListModeContext } from './Context.ts'

export const useListMode = (required = false) => {
  return useContextEx(ListModeContext, 'ListMode', required)
}
