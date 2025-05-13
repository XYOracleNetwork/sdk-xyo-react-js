import { useContextEx } from '@xylabs/react-shared'

import { ListModeContext } from './Context.ts'

export const useListMode = (required = false) => {
  return useContextEx(ListModeContext, 'ListMode', required)
}
