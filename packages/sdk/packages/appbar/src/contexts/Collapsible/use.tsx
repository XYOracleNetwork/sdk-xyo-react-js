import { useContextEx } from '@xyo-network/react-shared'

import { CollapsibleContext } from './context'

export const useCollapsible = () => useContextEx(CollapsibleContext, 'Collapsible', false)
