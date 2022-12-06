import { useContextEx } from '@xyo-network/react-shared'

import { HashSelectionHistoryContext } from '../../contexts'

export const useHashSelectionHistory = (required = true) => useContextEx(HashSelectionHistoryContext, 'HashSelectionHistory', required)
