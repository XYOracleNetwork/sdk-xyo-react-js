import { EllipsisTableCell, EllipsisTableCellProps } from './EllipsisTableCell'

export interface HashTableCellProps extends EllipsisTableCellProps {
  archive?: string
  dataType?: 'block' | 'payload'
  exploreDomain?: string
  network?: string
  forCell?: number //cell index for ellipsized table cell
}

export const HashTableCell: React.FC<HashTableCellProps> = ({ value, archive, forCell, dataType, network, exploreDomain, ...props }) => {
  const hashPath = `/${dataType}/hash/${value}?network=${network ?? 'main'}`
  const explorePath = archive ? `/archive/${archive}${hashPath}` : hashPath
  return (
    <EllipsisTableCell
      forCell={forCell}
      value={value}
      href={exploreDomain ? `${exploreDomain}${explorePath}}` : undefined}
      to={exploreDomain ? undefined : explorePath}
      {...props}
    />
  )
}
