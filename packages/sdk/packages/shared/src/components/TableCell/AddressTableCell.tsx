import { forwardRef } from 'react'

import { EllipsisTableCell, EllipsisTableCellProps } from './EllipsisTableCell'

export interface AddressTableCellProps extends EllipsisTableCellProps {
  archive?: string
  exploreDomain?: string
  link?: boolean
}

const AddressTableCell = forwardRef<HTMLTableCellElement, AddressTableCellProps>(({ value, archive, exploreDomain, link, ...props }, ref) => {
  const href = exploreDomain && archive ? `${exploreDomain}/archive/${archive}/address/${value}` : undefined
  const to = exploreDomain === undefined && archive ? `/archive/${archive}/address/${value}` : undefined

  return <EllipsisTableCell value={value} href={href} to={to} ref={ref} link={link} {...props} />
})

AddressTableCell.displayName = 'AddressTableCell'
export { AddressTableCell }
