import { useResetState } from '@xylabs/react-hooks'
import type { ContextExProviderProps } from '@xylabs/react-shared'
import type { PropsWithChildren } from 'react'
import React, { useMemo, useState } from 'react'

import { TableHeightContext } from './Context.ts'
import type { TableHeightState } from './State.ts'

export interface TableHeightProviderProps extends ContextExProviderProps, PropsWithChildren {
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
  const [visibleRows, setVisibleRows] = useResetState(defaultVisibleRows)
  const [rowHeight, setRowHeight] = useState<number | undefined>()

  const height = useMemo(() => {
    if (rowHeight !== undefined && visibleRows !== undefined) {
      return rowHeight * (visibleRows + additionalRows)
    }
  }, [defaultVisibleRows, rowHeight, visibleRows, additionalRows])

  const formattedHeight = useMemo(() => (height === undefined ? undefined : `${height}${heightFormat}`), [height, heightFormat])

  const value: TableHeightState = useMemo(() => ({
    height: formattedHeight, provided: true, rowHeight, setRowHeight, setVisibleRows, visibleRows,
  }), [formattedHeight, rowHeight, setRowHeight, setVisibleRows, visibleRows])

  return (
    <TableHeightContext value={value}>
      {children}
    </TableHeightContext>
  )
}
