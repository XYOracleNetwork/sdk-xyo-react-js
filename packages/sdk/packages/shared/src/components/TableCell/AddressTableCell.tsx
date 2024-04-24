import { forwardRef } from 'react'

import { EllipsisTableCell, EllipsisTableCellProps } from './EllipsisTableCell'

export interface AddressTableCellProps extends Omit<EllipsisTableCellProps, 'ref'> {
  /** @deprecated - archives are no longer supported */
  archive?: string
  /** @deprecated - use events instead */
  exploreDomain?: string
  link?: boolean
}

// eslint-disable-next-line deprecation/deprecation
const AddressTableCell = forwardRef<HTMLElement, AddressTableCellProps>(({ value, archive, exploreDomain, link, ...props }, ref) => {
  const href = exploreDomain && archive ? `${exploreDomain}/archive/${archive}/address/${value}` : undefined
  const to = exploreDomain === undefined && archive ? `/archive/${archive}/address/${value}` : undefined

  return <EllipsisTableCell value={value} href={href} to={to} ref={ref} link={link} {...props} />
})

AddressTableCell.displayName = 'AddressTableCell'
export { AddressTableCell }
