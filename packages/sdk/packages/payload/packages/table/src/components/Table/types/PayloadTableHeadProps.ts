import { TableHeadProps } from '@mui/material'

import { PayloadTableColumnConfig, PayloadTableColumnSlug } from '../PayloadTableColumnConfig.ts'

export interface PayloadTableHeadProps extends TableHeadProps {
  columns?: PayloadTableColumnConfig<PayloadTableColumnSlug>
}
