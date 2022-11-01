import { TableHeadProps } from '@mui/material'

import { PayloadTableColumnConfig } from '../PayloadTableColumnConfig'

export interface PayloadTableHeadProps extends TableHeadProps {
  columns?: PayloadTableColumnConfig
}
