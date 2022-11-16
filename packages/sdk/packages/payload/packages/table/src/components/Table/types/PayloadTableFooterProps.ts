import { TableExVariants } from '@xyo-network/react-table'
import { ChangeEvent, MouseEvent } from 'react'

export interface PayloadTableFooterProps {
  count?: number
  rowsPerPage?: number
  variant?: TableExVariants
  page?: number
  handleChangePage?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void
  handleChangeRowsPerPage?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  fetchMorePayloads?: () => void
  loading?: boolean
}
