import { useContextEx } from '../contextEx'
import { ListModeContext } from './Context'

export const useListMode = (required = true) => {
  return useContextEx(ListModeContext, 'ListMode', required)
}
