import { useContextEx } from '@xyo-network/react-shared'

import { CollapsibleContext } from './context.js'

export const useCollapsible = () => useContextEx(CollapsibleContext, 'Collapsible', false)
