import { TableHeadProps } from '@mui/material'

import { PayloadTableColumnConfig, PayloadTableColumnSlug } from '../PayloadTableColumnConfig'

export interface PayloadTableHeadProps<T = PayloadTableColumnSlug> extends TableHeadProps {
  columns?: PayloadTableColumnConfig<T>
}
