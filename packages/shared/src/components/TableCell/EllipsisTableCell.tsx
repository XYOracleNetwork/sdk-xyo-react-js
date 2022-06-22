import { TableCell, TableCellProps } from '@mui/material'
import { LinkEx } from '@xylabs/react-common'
import { useEffect, useRef, useState } from 'react'
import { To } from 'react-router-dom'

import { getActualPaddingX } from '../../lib'
import { findParent } from './findParent'
import { getRemainingRowWidth } from './getRemainingRowWidth'
import { getSmallestParentWidth } from './getSmallestParentWidth'

export interface EllipsisTableCellProps extends TableCellProps {
  value?: string
  to?: To | undefined
  href?: string | undefined
}

export const EllipsisTableCell: React.FC<EllipsisTableCellProps> = ({ children, value, to, href, ...props }) => {
  const [calcCellWidth, setCalcCellWidth] = useState<number>(0)
  const hashDivRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentElement = hashDivRef.current?.parentElement
    const cell = findParent('td', currentElement)
    const row = findParent('tr', currentElement)

    const checkWidth = (cell: HTMLElement) => {
      const smallestParentWidth = getSmallestParentWidth(cell)
      if (smallestParentWidth && row) {
        const remainingWidth = getRemainingRowWidth(row)
        const actualPaddingX = getActualPaddingX(cell)
        const remainderWidth = smallestParentWidth - remainingWidth - actualPaddingX
        cell.style.width = `${remainderWidth}`
        setCalcCellWidth(remainderWidth)
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
      row?.addEventListener('resize', onResize)
    }
    return () => {
      window.removeEventListener('resize', onResize)
      row?.removeEventListener('resize', onResize)
    }
  }, [hashDivRef])

  return (
    <TableCell {...props}>
      <div ref={hashDivRef}>
        {children ? (
          <span
            style={{
              display: 'block',
              maxWidth: calcCellWidth,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {children}
          </span>
        ) : href || to ? (
          <LinkEx
            style={{
              display: 'block',
              maxWidth: calcCellWidth,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            to={to}
            href={href}
            target={href ? '_blank' : undefined}
          >
            {value}
          </LinkEx>
        ) : (
          <span
            style={{
              display: 'block',
              maxWidth: calcCellWidth,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {value}
          </span>
        )}
      </div>
    </TableCell>
  )
}
