import { TableProps } from '@mui/material'
import { XyoBoundWitness, XyoBoundWitnessWithPartialMeta } from '@xyo-network/core'

import { BlockTableColumnConfig } from './BlockTableColumnConfig'

export interface BlockTableProps extends TableProps {
  blocks?: XyoBoundWitnessWithPartialMeta[] | null
  onRowClick?: (value: XyoBoundWitness) => void
  exploreDomain?: string
  columns?: BlockTableColumnConfig
}
