import type { TableHeadProps } from '@mui/material'

import type { TableColumnConfig } from '../lib/index.ts'

export interface PayloadTableHeadProps<TSlugs extends string = string> extends TableHeadProps {
  columns?: TableColumnConfig<TSlugs>
}
