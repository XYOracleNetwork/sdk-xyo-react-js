import type { Hash } from '@xylabs/hex'
import { useEvent } from '@xyo-network/react-event'
import React, { useRef } from 'react'

import type { EllipsisTableCellProps } from './EllipsisTableCell.tsx'
import { EllipsisTableCell } from './EllipsisTableCell.tsx'

export interface HashTableCellProps extends EllipsisTableCellProps {
  /** @deprecated - archives are no longer used */
  archive?: string
  dataType?: 'block' | 'payload'
  /** @deprecated - use event listeners instead of link building via props */
  exploreDomain?: string
  network?: string
  onHashClick?: (value: Hash) => void
}

export const HashTableCell: React.FC<HashTableCellProps> = ({
  value, dataType, network, onHashClick, ...props
}) => {
  const ref = useRef<HTMLTableCellElement | null>(null)
  const [tableCellRef] = useEvent<HTMLTableCellElement>(undefined, ref)

  return (
    <EllipsisTableCell
      ref={tableCellRef}
      value={value}
      {...props}
    />
  )
}
