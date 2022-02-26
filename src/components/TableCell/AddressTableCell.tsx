import { EllipsisTableCell, EllipsisTableCellProps } from './EllipsisTableCell'

export interface AddressTableCellProps extends EllipsisTableCellProps {
  archive?: string
  exploreDomain?: string
}

export const AddressTableCell: React.FC<AddressTableCellProps> = ({ value, archive, exploreDomain, ...props }) => {
  return (
    <EllipsisTableCell
      value={value}
      href={exploreDomain ? `${exploreDomain}/archive/${archive}/address/${value}` : undefined}
      to={exploreDomain ? undefined : `/archive/${archive}/address/${value}`}
      {...props}
    />
  )
}
