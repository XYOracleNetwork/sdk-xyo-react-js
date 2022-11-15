import { WithChildren } from '@xylabs/react-shared'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import { useEffect, useMemo, useState } from 'react'

import { TableHeightContext } from './Context'

export interface TableHeightProviderProps extends ContextExProviderProps, WithChildren {
  defaultVisibleRows?: number
  heightFormat?: string
}

export const TableHeightProvider: React.FC<TableHeightProviderProps> = ({ children, defaultVisibleRows, heightFormat = 'px' }) => {
  const [visibleRows, setVisibleRows] = useState(defaultVisibleRows)
  const [height, setHeight] = useState<number | undefined>()
  const [rowHeight, setRowHeight] = useState<number | undefined>()

  const formattedHeight = useMemo(() => (height !== undefined ? `${height}${heightFormat}` : undefined), [height, heightFormat])

  useEffect(() => {
    setVisibleRows(defaultVisibleRows)
  }, [defaultVisibleRows])

  useEffect(() => {
    if (rowHeight !== undefined && visibleRows !== undefined) {
      setHeight(rowHeight * visibleRows)
    }
  }, [defaultVisibleRows, rowHeight, visibleRows])

  return (
    <TableHeightContext.Provider value={{ height: formattedHeight, provided: true, rowHeight, setRowHeight, setVisibleRows, visibleRows }}>
      {children}
    </TableHeightContext.Provider>
  )
}
