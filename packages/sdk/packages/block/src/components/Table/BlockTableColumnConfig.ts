export type BlockTableColumnSlug = 'hash' | 'payloads' | 'valid'

export interface BlockTableColumnConfig {
  xs?: BlockTableColumnSlug[]
  // eslint-disable-next-line @typescript-eslint/member-ordering
  sm?: BlockTableColumnSlug[]
  // eslint-disable-next-line @typescript-eslint/member-ordering
  md?: BlockTableColumnSlug[]
  // eslint-disable-next-line @typescript-eslint/member-ordering
  lg?: BlockTableColumnSlug[]
  xl?: BlockTableColumnSlug[]
}

export const blockColumnNames: Record<BlockTableColumnSlug, string> = {
  hash: 'Hash',
  payloads: 'Payloads',
  valid: 'Valid',
}

export const blockTableColumnConfigDefaults = (): BlockTableColumnConfig => {
  const xs: BlockTableColumnSlug[] = ['hash', 'payloads', 'valid']
  const sm: BlockTableColumnSlug[] = ['hash', 'payloads', 'valid']
  const md: BlockTableColumnSlug[] = ['hash', 'payloads', 'valid']
  const lg: BlockTableColumnSlug[] = ['hash', 'payloads', 'valid']
  const xl: BlockTableColumnSlug[] = ['hash', 'payloads', 'valid']
  return { lg, md, sm, xl, xs }
}
