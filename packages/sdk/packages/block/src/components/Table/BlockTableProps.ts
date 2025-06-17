import type { BoundWitness } from '@xyo-network/boundwitness-model'
import type { TableExProps } from '@xyo-network/react-table'

import type { BlockTableColumnConfig, BlockTableColumnSlug } from './BlockTableColumnConfig.ts'

export interface BlockTableProps extends TableExProps {
  blocks?: BoundWitness[] | null
  clickableFields?: BlockTableColumnSlug[]
  columns?: BlockTableColumnConfig
  /** @deprecated - use events to build links instead of passing props */
  exploreDomain?: string
  onRowClick?: (value: BoundWitness) => void
}
