import { useContextEx } from '@xyo-network/react-shared'

import { TableHeightContext } from './Context'

export const useTableHeight = (required = false) => useContextEx(TableHeightContext, 'TableHeight', required)
