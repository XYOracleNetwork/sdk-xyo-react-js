import { TableBodyProps, TableRowProps } from '@mui/material'
import { WithChildren } from '@xylabs/react-shared'
import { XyoPayload, XyoPayloads } from '@xyo-network/payload-model'
import { ComponentType } from 'react'

export interface PayloadTableBodyProps extends TableBodyProps, WithChildren {
  payloads?: XyoPayloads
  archive?: string
  maxSchemaDepth?: number
  onRowClick?: (value: XyoPayload) => void
  exploreDomain?: string
  emptyRows?: number
  noResults?: boolean
  NoResultRowComponent?: ComponentType<TableRowProps>
}
