import { EllipsisTableCell, EllipsisTableCellProps } from './EllipsisTableCell'

export interface HashTableCellProps extends EllipsisTableCellProps {
  archive?: string
  dataType?: 'block' | 'payload'
  exploreDomain?: string
}

export const HashTableCell: React.FC<HashTableCellProps> = ({ value, archive, dataType, exploreDomain, ...props }) => {
  return (
    <EllipsisTableCell
      value={value}
      href={exploreDomain ? `${exploreDomain}/archive/${archive}/${dataType}/hash/${value}` : undefined}
      to={exploreDomain ? undefined : `/archive/${archive}/${dataType}/hash/${value}`}
      {...props}
    />
  )
}
