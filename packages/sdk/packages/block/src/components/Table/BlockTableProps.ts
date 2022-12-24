import { XyoBoundWitness } from '@xyo-network/boundwitness-model'
import { TableExProps } from '@xyo-network/react-table'

import { BlockTableColumnConfig } from './BlockTableColumnConfig'

export interface BlockTableProps extends TableExProps {
  blocks?: XyoBoundWitness[] | null
  archive?: string
  onRowClick?: (value: XyoBoundWitness) => void
  exploreDomain?: string
  columns?: BlockTableColumnConfig
}
