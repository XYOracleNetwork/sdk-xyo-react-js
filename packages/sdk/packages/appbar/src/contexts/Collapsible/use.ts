import { useContextEx } from '@xyo-network/react-shared'

import { CollapsibleContext } from './context.ts'

export const useCollapsible = () => useContextEx(CollapsibleContext, 'Collapsible', false)
