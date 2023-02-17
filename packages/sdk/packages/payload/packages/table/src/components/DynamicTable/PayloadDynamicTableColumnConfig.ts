export type PayloadDynamicTableColumnSlug = 'hash' | 'schema' | 'valid' | 'details' | 'render' | 'icon'

export interface PayloadDynamicTableColumnHeadData {
  alignment?: 'left' | 'center' | 'right'
  name?: string
  slug?: 'hash' | 'schema' | 'valid' | 'details' | 'render' | 'icon'
  width?: string | number
}

export interface PayloadDynamicTableColumnConfig {
  xs?: PayloadDynamicTableColumnHeadData[]
  // eslint-disable-next-line @typescript-eslint/member-ordering
  sm?: PayloadDynamicTableColumnHeadData[]
  // eslint-disable-next-line @typescript-eslint/member-ordering
  md?: PayloadDynamicTableColumnHeadData[]
  // eslint-disable-next-line @typescript-eslint/member-ordering
  lg?: PayloadDynamicTableColumnHeadData[]
  xl?: PayloadDynamicTableColumnHeadData[]
}

export const payloadDynamicTableColumnConfigDefaults = (): PayloadDynamicTableColumnConfig => {
  const xs: PayloadDynamicTableColumnHeadData[] = [
    { alignment: 'left', name: 'Hash', slug: 'hash', width: '100%' },
    { alignment: 'left', name: 'Schema', slug: 'schema', width: '50px' },
    { alignment: 'left', name: 'Valid', slug: 'valid', width: '50px' },
  ]
  const sm: PayloadDynamicTableColumnHeadData[] = [
    { alignment: 'left', name: 'Icon', slug: 'icon', width: '50px' },
    { alignment: 'left', name: 'Hash', slug: 'hash', width: '100%' },
    { alignment: 'left', name: 'Schema', slug: 'schema', width: '50px' },
    { alignment: 'left', name: 'Valid', slug: 'valid', width: '50px' },
  ]
  const md: PayloadDynamicTableColumnHeadData[] = [
    { alignment: 'left', name: 'Icon', slug: 'icon', width: '50px' },
    { alignment: 'left', name: 'Hash', slug: 'hash', width: '100%' },
    { alignment: 'left', name: 'Schema', slug: 'schema', width: '50px' },
    { alignment: 'left', name: 'Valid', slug: 'valid', width: '50px' },
  ]
  const lg: PayloadDynamicTableColumnHeadData[] = [
    { alignment: 'left', name: 'Icon', slug: 'icon', width: '50px' },
    { alignment: 'left', name: 'Hash', slug: 'hash', width: '100%' },
    { alignment: 'left', name: 'Schema', slug: 'schema', width: '50px' },
    { alignment: 'left', name: 'Render', slug: 'render', width: '50px' },
    { alignment: 'left', name: 'Valid', slug: 'valid', width: '50px' },
  ]
  const xl: PayloadDynamicTableColumnHeadData[] = [
    { alignment: 'left', name: 'Icon', slug: 'icon', width: '50px' },
    { alignment: 'left', name: 'Hash', slug: 'hash', width: '100%' },
    { alignment: 'left', name: 'Schema', slug: 'schema', width: '50px' },
    { alignment: 'left', name: 'Render', slug: 'render', width: '50px' },
    { alignment: 'left', name: 'Valid', slug: 'valid', width: '50px' },
  ]
  return { lg, md, sm, xl, xs }
}
