import type { TableBodyProps, TableRowProps } from '@mui/material'
import type { Hash } from '@xylabs/hex'
import type { WithChildren } from '@xylabs/react-shared'
import type { Payload } from '@xyo-network/payload-model'
import type { ComponentType } from 'react'

export interface PayloadTableBodyProps extends TableBodyProps, WithChildren {
  NoResultRowComponent?: ComponentType<TableRowProps>
  archive?: string
  emptyRows?: number
  exploreDomain?: string
  maxSchemaDepth?: number
  noResults?: boolean
  onHashClick?: (value: Hash) => void
  onRowClick?: (value: Payload) => void
  payloads?: Payload[]
}
