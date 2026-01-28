import type { Hash } from '@xylabs/sdk-js'
import React from 'react'

import type { EllipsisTableCellProps } from './EllipsisTableCell.tsx'
import { EllipsisTableCell } from './EllipsisTableCell.tsx'

export interface HashTableCellProps extends EllipsisTableCellProps {
  /** @deprecated - archives are no longer used */
  archive?: string
  dataType?: 'block' | 'payload'
  /** @deprecated - use event listeners instead of link building via props */
  exploreDomain?: string
  /** @deprecated - use event listeners instead of link building via props */
  network?: string
  /** @deprecated - onClick instead */
  onHashClick?: (value: Hash) => void
}

export const HashTableCell: React.FC<HashTableCellProps> = ({
  ref, value, dataType, ...props
}) => {
  return (
    <EllipsisTableCell
      value={value}
      {...props}
    />
  )
}
