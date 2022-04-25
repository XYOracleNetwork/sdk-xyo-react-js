export type PayloadTableColumnSlug = 'hash' | 'archive' | 'client' | 'date' | 'time' | 'schema' | 'valid'

export interface PayloadTableColumnConfig {
  xs?: PayloadTableColumnSlug[]
  sm?: PayloadTableColumnSlug[]
  md?: PayloadTableColumnSlug[]
  lg?: PayloadTableColumnSlug[]
  xl?: PayloadTableColumnSlug[]
}

export const payloadColumnNames: Record<PayloadTableColumnSlug, string> = {
  archive: 'Archive',
  client: 'Client',
  date: 'Date',
  hash: 'Hash',
  schema: 'Schema',
  time: 'Time',
  valid: 'Valid',
}

export const payloadTableColumnConfigDefaults = (): PayloadTableColumnConfig => {
  const xs: PayloadTableColumnSlug[] = ['hash']
  const sm: PayloadTableColumnSlug[] = ['hash', 'valid']
  const md: PayloadTableColumnSlug[] = ['hash', 'schema', 'time', 'valid']
  const lg: PayloadTableColumnSlug[] = ['hash', 'schema', 'archive', 'date', 'time', 'valid']
  const xl: PayloadTableColumnSlug[] = ['hash', 'schema', 'archive', 'client', 'date', 'time', 'valid']
  return { lg, md, sm, xl, xs }
}
