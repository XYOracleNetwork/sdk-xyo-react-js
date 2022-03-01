import { TableCell, TableCellProps, Typography, useTheme } from '@mui/material'
import { LinkEx } from '@xylabs/sdk-react'
import { useEffect, useRef, useState } from 'react'
import { To } from 'react-router-dom'

import { findParent } from './findParent'
import { getRemainingRowWidth } from './getRemainingRowWidth'
import { getSmallestParentWidth } from './getSmallestParentWidth'

interface TableCellValueProps {
  value: string | undefined
  hashCellWidth: number | undefined
}

const TableCellValue: React.FC<TableCellValueProps> = ({ value, hashCellWidth }) => (
  <Typography
    variant="body2"
    fontFamily="monospace"
    style={{
      display: 'block',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      width: hashCellWidth,
    }}
  >
    {value}
  </Typography>
)

export interface EllipsisTableCellProps extends TableCellProps {
  value?: string
  to?: To | undefined
  href?: string | undefined
}

export const EllipsisTableCell: React.FC<EllipsisTableCellProps> = ({ value, to, href, ...props }) => {
  const [hashCellWidth, setHashCellWidth] = useState<number>()
  const hashDivRef = useRef<HTMLDivElement>(null)

  const theme = useTheme()
  const spacing = parseInt(theme.spacing(2).substring(-2))

  useEffect(() => {
    const currentElement = hashDivRef.current?.parentElement
    const cell = findParent('td', currentElement)
    const row = findParent('tr', currentElement)

    const checkWidth = (cell: HTMLElement) => {
      const smallestParentWidth = getSmallestParentWidth(cell)
      if (smallestParentWidth && row) {
        const remainderWidth = smallestParentWidth - getRemainingRowWidth(row) - spacing
        if (cell.clientWidth > remainderWidth) {
          setHashCellWidth(remainderWidth)
        } else if (hashCellWidth === undefined) {
          setHashCellWidth(cell.clientWidth)
        }
      }
    }

    const onResize = () => {
      if (cell) {
        checkWidth(cell)
      }
    }

    if (cell) {
      checkWidth(cell)
      window.addEventListener('resize', onResize)
    }
    return () => {
      window.removeEventListener('resize', onResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hashDivRef, spacing])

  return (
    <TableCell {...props}>
      <div ref={hashDivRef}>
        {href || to ? (
          <LinkEx to={to} href={href}>
            <TableCellValue hashCellWidth={hashCellWidth} value={value} />
          </LinkEx>
        ) : (
          <TableCellValue hashCellWidth={hashCellWidth} value={value} />
        )}
      </div>
    </TableCell>
  )
}
