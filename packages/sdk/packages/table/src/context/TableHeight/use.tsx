import { useContextEx } from '@xyo-network/react-shared'

import { TableHeightContext } from './Context.js'

export const useTableHeight = (required = false) => useContextEx(TableHeightContext, 'TableHeight', required)
