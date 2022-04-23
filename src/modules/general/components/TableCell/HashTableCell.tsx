import { EllipsisTableCell, EllipsisTableCellProps } from './EllipsisTableCell'

export interface HashTableCellProps extends EllipsisTableCellProps {
  archive?: string
  dataType?: 'block' | 'payload'
  exploreDomain?: string
  network?: string
}

export const HashTableCell: React.FC<HashTableCellProps> = ({ value, archive, dataType, network, exploreDomain, ...props }) => {
  const explorePath = `/archive/${archive}/${dataType}/hash/${value}?network=${network ?? 'main'}`
  return <EllipsisTableCell value={value} href={exploreDomain ? `${exploreDomain}${explorePath}}` : undefined} to={exploreDomain ? undefined : explorePath} {...props} />
}
