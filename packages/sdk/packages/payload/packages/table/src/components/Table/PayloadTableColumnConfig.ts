import type { TableColumnConfig, TableColumnNames } from './lib/index.ts'

export type PayloadTableColumnConfig = TableColumnConfig<PayloadTableColumnSlug>

export type PayloadTableColumnSlug = 'hash' | 'schema' | 'valid' | string

export const payloadColumnNames: TableColumnNames<PayloadTableColumnSlug> = {
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
  return {
    lg, md, sm, xl, xs,
  }
}
