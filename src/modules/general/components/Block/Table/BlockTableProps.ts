import { TableProps } from '@mui/material'
import { XyoBoundWitness } from '@xyo-network/sdk-xyo-client-js'

import { BlockTableColumnConfig } from './BlockTableColumnConfig'

export interface BlockTableProps extends TableProps {
  blocks?: XyoBoundWitness[] | null
  onRowClick?: (value: XyoBoundWitness) => void
  exploreDomain?: string
  columns?: BlockTableColumnConfig
}
