import { useContextEx } from '@xylabs/react-shared'

import { TableHeightContext } from './Context.ts'

export const useTableHeight = (required = false) => useContextEx(TableHeightContext, 'TableHeight', required)
