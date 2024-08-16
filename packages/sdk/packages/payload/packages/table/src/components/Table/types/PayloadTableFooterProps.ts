import type { TableExVariants } from '@xyo-network/react-table'
import type { ChangeEvent, MouseEvent } from 'react'

export interface PayloadTableFooterProps {
  count?: number
  fetchMorePayloads?: () => void
  handleChangePage?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  handleChangeRowsPerPage?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  loading?: boolean
  page?: number
  rowsPerPage?: number
  variant?: TableExVariants
}
