export type PayloadDynamicTableColumnSlug = 'hash' | 'schema' | 'valid' | 'details' | 'render' | 'icon'

export interface PayloadDynamicTableColumnConfig {
  xs?: PayloadDynamicTableColumnSlug[]
  sm?: PayloadDynamicTableColumnSlug[]
  md?: PayloadDynamicTableColumnSlug[]
  lg?: PayloadDynamicTableColumnSlug[]
  xl?: PayloadDynamicTableColumnSlug[]
}

export const payloadColumnNames: Record<PayloadDynamicTableColumnSlug, string> = {
  details: 'Details',
  hash: 'Hash',
  icon: 'Icon',
  render: 'Render',
  schema: 'Schema',
  valid: 'Valid',
}

export const payloadDynamicTableColumnConfigDefaults = (): PayloadDynamicTableColumnConfig => {
  const xs: PayloadDynamicTableColumnSlug[] = ['icon', 'hash', 'schema', 'render', 'valid']
  const sm: PayloadDynamicTableColumnSlug[] = ['icon', 'hash', 'schema', 'render', 'valid']
  const md: PayloadDynamicTableColumnSlug[] = ['icon', 'hash', 'schema', 'render', 'valid']
  const lg: PayloadDynamicTableColumnSlug[] = ['icon', 'hash', 'schema', 'render', 'valid']
  const xl: PayloadDynamicTableColumnSlug[] = ['icon', 'hash', 'schema', 'render', 'valid']
  return { lg, md, sm, xl, xs }
}
