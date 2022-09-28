export type PayloadDynamicTableColumnSlug = 'hash' | 'schema' | 'valid' | 'details' | 'render' | 'icon'

export interface PayloadDynamicTableColumnHeadData {
  slug?: 'hash' | 'schema' | 'valid' | 'details' | 'render' | 'icon'
  alignment?: 'left' | 'center' | 'right'
  width?: string | number
  name?: string
}

export interface PayloadDynamicTableColumnConfig {
  xs?: PayloadDynamicTableColumnHeadData[]
  sm?: PayloadDynamicTableColumnHeadData[]
  md?: PayloadDynamicTableColumnHeadData[]
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
