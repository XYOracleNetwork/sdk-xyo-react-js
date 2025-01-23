export type TableColumnNames<T extends string> = Record<T, string>

export interface TableColumnConfig<T> {
  xs?: T[]
  // eslint-disable-next-line @typescript-eslint/member-ordering
  sm?: T[]
  // eslint-disable-next-line @typescript-eslint/member-ordering
  md?: T[]
  // eslint-disable-next-line @typescript-eslint/member-ordering
  lg?: T[]
  xl?: T[]
}
