import { Breakpoint, TableHeadProps } from '@mui/material'

import { PayloadTableColumnConfig } from '../PayloadTableColumnConfig'

export interface PayloadTableHeadProps extends TableHeadProps {
  breakPoint?: Breakpoint
  columns?: PayloadTableColumnConfig
}
