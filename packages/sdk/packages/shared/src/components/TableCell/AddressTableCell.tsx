import React from 'react'

import type { EllipsisTableCellProps } from './EllipsisTableCell.tsx'
import { EllipsisTableCell } from './EllipsisTableCell.tsx'

export interface AddressTableCellProps extends EllipsisTableCellProps {
  /** @deprecated - archives are no longer supported */
  archive?: string
  /** @deprecated - use events instead */
  exploreDomain?: string
  link?: boolean
}

const AddressTableCell = ({
  ref, value, archive, exploreDomain, link, ...props
}: AddressTableCellProps) => {
  const href = exploreDomain && archive ? `${exploreDomain}/archive/${archive}/address/${value}` : undefined
  const to = exploreDomain === undefined && archive ? `/archive/${archive}/address/${value}` : undefined

  return <EllipsisTableCell value={value} href={href} to={to} ref={ref} link={link} {...props} />
}

AddressTableCell.displayName = 'AddressTableCell'
export { AddressTableCell }
