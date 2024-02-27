import { Hash } from '@xylabs/hex'
import { useEvent } from '@xyo-network/react-event'
import { useRef } from 'react'

import { EllipsisTableCell, EllipsisTableCellProps } from './EllipsisTableCell'

export interface HashTableCellProps extends EllipsisTableCellProps {
  archive?: string
  dataType?: 'block' | 'payload'
  exploreDomain?: string
  network?: string
}

export const HashTableCell: React.FC<HashTableCellProps> = ({ value, archive, dataType, network, exploreDomain, ...props }) => {
  const ref = useRef<HTMLTableCellElement | null>(null)
  const [tableCellRef, dispatch] = useEvent<HTMLTableCellElement>(undefined, ref)
  const hashPath = `/${dataType}/hash/${value}?network=${network ?? 'main'}`
  const explorePath = archive ? `/archive/${archive}${hashPath}` : hashPath

  const handleCellClick = () => {
    dispatch?.('hash', 'click', value as Hash)
  }

  return (
    <EllipsisTableCell
      onClick={handleCellClick}
      ref={tableCellRef}
      value={value}
      href={exploreDomain ? `${exploreDomain}${explorePath}}` : undefined}
      to={exploreDomain ? undefined : explorePath}
      {...props}
    />
  )
}
