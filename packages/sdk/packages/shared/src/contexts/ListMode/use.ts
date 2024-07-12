import { useContextEx } from '../contextEx/index.js'
import { ListModeContext } from './Context.js'

export const useListMode = (required = false) => {
  return useContextEx(ListModeContext, 'ListMode', required)
}
