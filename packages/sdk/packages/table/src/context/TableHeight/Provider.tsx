import type { WithChildren } from '@xylabs/react-shared'
import type { ContextExProviderProps } from '@xyo-network/react-shared'
import React, {
  useEffect, useMemo, useState,
} from 'react'

import { TableHeightContext } from './Context.ts'

export interface TableHeightProviderProps extends ContextExProviderProps, WithChildren {
  /** @field Account for optional header and footer rows */
  additionalRows?: number
  defaultVisibleRows?: number
  heightFormat?: string
}

export const TableHeightProvider: React.FC<TableHeightProviderProps> = ({
  children,
  additionalRows = 0,
  defaultVisibleRows,
  heightFormat = 'px',
}) => {
  const [visibleRows, setVisibleRows] = useState(defaultVisibleRows)
  const [height, setHeight] = useState<number | undefined>()
  const [rowHeight, setRowHeight] = useState<number | undefined>()

  const formattedHeight = useMemo(() => (height === undefined ? undefined : `${height}${heightFormat}`), [height, heightFormat])

  useEffect(() => {
    setVisibleRows(defaultVisibleRows)
  }, [defaultVisibleRows])

  useEffect(() => {
    if (rowHeight !== undefined && visibleRows !== undefined) {
      setHeight(rowHeight * (visibleRows + additionalRows))
    }
  }, [defaultVisibleRows, rowHeight, visibleRows, additionalRows])

  const value = useMemo(() => ({
    height: formattedHeight, provided: true, rowHeight, setRowHeight, setVisibleRows, visibleRows,
  }), [formattedHeight, rowHeight, setRowHeight, setVisibleRows, visibleRows])

  return (
    <TableHeightContext.Provider value={value}>
      {children}
    </TableHeightContext.Provider>
  )
}
