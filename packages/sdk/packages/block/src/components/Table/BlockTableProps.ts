import type { BoundWitness } from '@xyo-network/boundwitness-model'
import type { TableExProps } from '@xyo-network/react-table'

import type { BlockTableColumnConfig } from './BlockTableColumnConfig.ts'

export interface BlockTableProps extends TableExProps {
  blocks?: BoundWitness[] | null
  columns?: BlockTableColumnConfig
  exploreDomain?: string
  onRowClick?: (value: BoundWitness) => void
}
