import { TableBodyProps, TableRowProps } from '@mui/material'
import { Hash } from '@xylabs/hex'
import { WithChildren } from '@xylabs/react-shared'
import { Payload } from '@xyo-network/payload-model'
import { ComponentType } from 'react'

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
