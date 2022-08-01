import { TableProps } from '@mui/material'
import { XyoBoundWitness, XyoBoundWitnessWithPartialMeta } from '@xyo-network/boundwitness'

import { BlockTableColumnConfig } from './BlockTableColumnConfig'

export interface BlockTableProps extends TableProps {
  blocks?: XyoBoundWitnessWithPartialMeta[] | null
  archive?: string
  onRowClick?: (value: XyoBoundWitness) => void
  exploreDomain?: string
  columns?: BlockTableColumnConfig
}
