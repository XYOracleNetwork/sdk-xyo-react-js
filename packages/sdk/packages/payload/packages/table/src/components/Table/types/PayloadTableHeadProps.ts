import type { TableHeadProps } from '@mui/material'

import type { PayloadTableColumnConfig, PayloadTableColumnSlug } from '../PayloadTableColumnConfig.ts'

export interface PayloadTableHeadProps extends TableHeadProps {
  columns?: PayloadTableColumnConfig<PayloadTableColumnSlug>
}
