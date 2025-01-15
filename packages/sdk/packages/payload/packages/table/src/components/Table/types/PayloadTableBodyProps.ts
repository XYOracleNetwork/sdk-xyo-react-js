import type { TableBodyProps, TableRowProps } from '@mui/material'
import type { Hash } from '@xylabs/hex'
import type { Payload } from '@xyo-network/payload-model'
import type { ComponentType, PropsWithChildren } from 'react'

export interface PayloadTableBodyProps<TPayload extends Payload = Payload> extends TableBodyProps, PropsWithChildren {
  NoResultRowComponent?: ComponentType<TableRowProps>
  archive?: string
  emptyRows?: number
  exploreDomain?: string
  maxSchemaDepth?: number
  noResults?: boolean
  onHashClick?: (value: Hash) => void
  onRowClick?: (value: Payload) => void
  payloads?: TPayload[]
}
