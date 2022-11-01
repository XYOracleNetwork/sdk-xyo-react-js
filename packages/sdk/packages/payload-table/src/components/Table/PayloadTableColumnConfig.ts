import { Breakpoint, TableHeadProps } from '@mui/material'

export type PayloadTableColumnSlug = 'hash' | 'schema' | 'valid'

export interface PayloadTableColumnConfig {
  xs?: PayloadTableColumnSlug[]
  sm?: PayloadTableColumnSlug[]
  md?: PayloadTableColumnSlug[]
  lg?: PayloadTableColumnSlug[]
  xl?: PayloadTableColumnSlug[]
}

export const payloadColumnNames: Record<PayloadTableColumnSlug, string> = {
  hash: 'Hash',
  schema: 'Schema',
  valid: 'Valid',
}

export const payloadTableColumnConfigDefaults = (): PayloadTableColumnConfig => {
  const xs: PayloadTableColumnSlug[] = ['hash', 'schema', 'valid']
  const sm: PayloadTableColumnSlug[] = ['hash', 'schema', 'valid']
  const md: PayloadTableColumnSlug[] = ['hash', 'schema', 'valid']
  const lg: PayloadTableColumnSlug[] = ['hash', 'schema', 'valid']
  const xl: PayloadTableColumnSlug[] = ['hash', 'schema', 'valid']
  return { lg, md, sm, xl, xs }
}

export interface PayloadTableHeadProps extends TableHeadProps {
  breakPoint?: Breakpoint
  columns?: PayloadTableColumnConfig
}
