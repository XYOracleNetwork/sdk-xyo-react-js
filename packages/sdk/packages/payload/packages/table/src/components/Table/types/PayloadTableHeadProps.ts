import { TableHeadProps } from '@mui/material'

import { PayloadTableColumnConfig, PayloadTableColumnSlug } from '../PayloadTableColumnConfig.js'

export interface PayloadTableHeadProps extends TableHeadProps {
  columns?: PayloadTableColumnConfig<PayloadTableColumnSlug>
}
