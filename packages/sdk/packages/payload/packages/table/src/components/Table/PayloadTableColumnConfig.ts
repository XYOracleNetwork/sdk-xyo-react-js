export type PayloadTableColumnSlug = 'hash' | 'schema' | 'valid'

export interface PayloadTableColumnConfig<T = PayloadTableColumnSlug> {
  xs?: T[]
  // eslint-disable-next-line @typescript-eslint/member-ordering
  sm?: T[]
  // eslint-disable-next-line @typescript-eslint/member-ordering
  md?: T[]
  // eslint-disable-next-line @typescript-eslint/member-ordering
  lg?: T[]
  xl?: T[]
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
  return {
    lg, md, sm, xl, xs,
  }
}
