import { TableProps } from '@mui/material'
import { XyoBoundWitness } from '@xyo-network/boundwitness'

import { BlockTableColumnConfig } from './BlockTableColumnConfig'

export interface BlockTableProps extends TableProps {
  blocks?: XyoBoundWitness[] | null
  archive?: string
  onRowClick?: (value: XyoBoundWitness) => void
  exploreDomain?: string
  columns?: BlockTableColumnConfig
}
