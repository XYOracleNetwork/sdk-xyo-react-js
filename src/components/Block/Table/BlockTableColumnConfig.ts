export type BlockTableColumnSlug = 'hash' | 'archive' | 'client' | 'date' | 'time' | 'payloads' | 'valid'

export interface BlockTableColumnConfig {
  xs?: BlockTableColumnSlug[]
  sm?: BlockTableColumnSlug[]
  md?: BlockTableColumnSlug[]
  lg?: BlockTableColumnSlug[]
  xl?: BlockTableColumnSlug[]
}

export const blockColumnNames: Record<BlockTableColumnSlug, string> = {
  archive: 'Archive',
  client: 'Client',
  date: 'Date',
  hash: 'Hash',
  payloads: 'Payloads',
  time: 'Time',
  valid: 'Valid',
}

export const blockTableColumnConfigDefaults = (): BlockTableColumnConfig => {
  const xs: BlockTableColumnSlug[] = ['hash']
  const sm: BlockTableColumnSlug[] = ['hash', 'time', 'valid']
  const md: BlockTableColumnSlug[] = ['hash', 'payloads', 'archive', 'time', 'valid']
  const lg: BlockTableColumnSlug[] = ['hash', 'payloads', 'archive', 'date', 'time', 'valid']
  const xl: BlockTableColumnSlug[] = ['hash', 'payloads', 'archive', 'client', 'date', 'time', 'valid']
  return { lg, md, sm, xl, xs }
}
