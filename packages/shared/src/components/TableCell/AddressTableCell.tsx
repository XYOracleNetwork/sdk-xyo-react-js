import { EllipsisTableCell, EllipsisTableCellProps } from './EllipsisTableCell'

export interface AddressTableCellProps extends EllipsisTableCellProps {
  archive?: string
  exploreDomain?: string
}

export const AddressTableCell: React.FC<AddressTableCellProps> = ({ value, archive, exploreDomain, ...props }) => {
  const href = exploreDomain && archive ? `${exploreDomain}/archive/${archive}/address/${value}` : undefined
  const to = exploreDomain === undefined && archive ? `/archive/${archive}/address/${value}` : undefined

  return <EllipsisTableCell value={value} href={href} to={to} {...props} />
}
