import { XyoBoundWitness } from '@xyo-network/boundwitness-model'
import { TableExProps } from '@xyo-network/react-table'

import { BlockTableColumnConfig } from './BlockTableColumnConfig'

export interface BlockTableProps extends TableExProps {
  archive?: string
  blocks?: XyoBoundWitness[] | null
  columns?: BlockTableColumnConfig
  exploreDomain?: string
  onRowClick?: (value: XyoBoundWitness) => void
}
