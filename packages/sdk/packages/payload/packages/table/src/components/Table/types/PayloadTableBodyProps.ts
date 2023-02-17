import { TableBodyProps, TableRowProps } from '@mui/material'
import { WithChildren } from '@xylabs/react-shared'
import { XyoPayload, XyoPayloads } from '@xyo-network/payload-model'
import { ComponentType } from 'react'

export interface PayloadTableBodyProps extends TableBodyProps, WithChildren {
  NoResultRowComponent?: ComponentType<TableRowProps>
  archive?: string
  emptyRows?: number
  exploreDomain?: string
  maxSchemaDepth?: number
  noResults?: boolean
  onRowClick?: (value: XyoPayload) => void
  payloads?: XyoPayloads
}
