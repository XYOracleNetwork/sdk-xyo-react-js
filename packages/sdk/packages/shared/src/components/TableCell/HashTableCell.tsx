import type { Hash } from '@xylabs/hex'
import { useEvent } from '@xyo-network/react-event'
import React, { useRef } from 'react'

import type { EllipsisTableCellProps } from './EllipsisTableCell.tsx'
import { EllipsisTableCell } from './EllipsisTableCell.tsx'

export interface HashTableCellProps extends EllipsisTableCellProps {
  archive?: string
  dataType?: 'block' | 'payload'
  exploreDomain?: string
  network?: string
  onHashClick?: (value: Hash) => void
}

export const HashTableCell: React.FC<HashTableCellProps> = ({
  value, archive, dataType, network, exploreDomain, onHashClick, ...props
}) => {
  const ref = useRef<HTMLTableCellElement | null>(null)
  const [tableCellRef, dispatch] = useEvent<HTMLTableCellElement>(undefined, ref)
  const hashPath = `/${dataType}/hash/${value}?network=${network ?? 'main'}`
  const explorePath = archive ? `/archive/${archive}${hashPath}` : hashPath

  const handleCellClick = () => {
    if (onHashClick) {
      onHashClick(value as Hash)
    } else {
      dispatch?.('hash', 'click', value as Hash)
    }
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
