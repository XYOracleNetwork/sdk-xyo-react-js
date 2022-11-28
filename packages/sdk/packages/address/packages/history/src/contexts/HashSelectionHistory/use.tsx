import { useContextEx } from '@xyo-network/react-shared'

import { HashSelectionHistoryContext } from './Context'

export const useHashSelectionHistory = (required = true) => useContextEx(HashSelectionHistoryContext, 'HashSelectionHistory', required)
