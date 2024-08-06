import { BoundWitness } from '@xyo-network/boundwitness-model'
import { TableExProps } from '@xyo-network/react-table'

import { BlockTableColumnConfig } from './BlockTableColumnConfig.tsx'

export interface BlockTableProps extends TableExProps {
  blocks?: BoundWitness[] | null
  columns?: BlockTableColumnConfig
  exploreDomain?: string
  onRowClick?: (value: BoundWitness) => void
}
