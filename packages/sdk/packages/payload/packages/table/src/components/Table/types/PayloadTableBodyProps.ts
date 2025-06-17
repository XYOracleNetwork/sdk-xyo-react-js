import type { TableBodyProps, TableRowProps } from '@mui/material'
import type { Hash } from '@xylabs/hex'
import type { Payload } from '@xyo-network/payload-model'
import type { ComponentType, PropsWithChildren } from 'react'

import type { PayloadTableColumnSlug } from '../PayloadTableColumnConfig.ts'

export interface PayloadTableBodyProps<TPayload extends Payload = Payload> extends TableBodyProps, PropsWithChildren {
  NoResultRowComponent?: ComponentType<TableRowProps>
  /** @deprecated - archives are no longer used */
  archive?: string
  clickableFields?: PayloadTableColumnSlug[]
  emptyRows?: number
  /** @deprecated - use events for link building */
  exploreDomain?: string
  maxSchemaDepth?: number
  noResults?: boolean
  onHashClick?: (value: Hash) => void
  onRowClick?: (value: Payload) => void
  payloads?: TPayload[]
}
