import { TableHeadProps } from '@mui/material'

import { PayloadTableColumnConfig, PayloadTableColumnSlug } from '../PayloadTableColumnConfig.tsx'

export interface PayloadTableHeadProps extends TableHeadProps {
  columns?: PayloadTableColumnConfig<PayloadTableColumnSlug>
}
