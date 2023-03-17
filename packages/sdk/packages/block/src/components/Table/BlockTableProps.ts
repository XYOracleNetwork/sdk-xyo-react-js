import { BoundWitness } from '@xyo-network/boundwitness-model'
import { TableExProps } from '@xyo-network/react-table'

import { BlockTableColumnConfig } from './BlockTableColumnConfig'

export interface BlockTableProps extends TableExProps {
  archive?: string
  blocks?: BoundWitness[] | null
  columns?: BlockTableColumnConfig
  exploreDomain?: string
  onRowClick?: (value: BoundWitness) => void
}
