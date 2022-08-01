import { useContextEx } from '../contextEx'
import { ListModeContext } from './Context'

export const useListMode = (required = false) => {
  return useContextEx(ListModeContext, 'ListMode', required)
}
