import { Link, TableCell, TableCellProps, useTheme } from '@mui/material'
import { LinkEx } from '@xylabs/sdk-react'
import { useEffect, useRef, useState } from 'react'

export interface HashTableCellProps extends TableCellProps {
  hash?: string
  archive?: string
  dataType?: 'block' | 'payload'
  exploreDomain?: string
}

const getSmallestParantWidth = (element: HTMLElement, maxDepth = 4) => {
  let currentElement: HTMLElement | null = element?.parentElement
  let width = currentElement?.clientWidth ?? 1024
  let maxDepthCounter = maxDepth
  while (currentElement && maxDepthCounter > 0) {
    if (width > currentElement.getBoundingClientRect()?.['width']) {
      width = currentElement.getBoundingClientRect()?.['width']
    }
    currentElement = currentElement.parentElement
    maxDepthCounter--
  }
  return width
}

export const HashTableCell: React.FC<HashTableCellProps> = ({ hash, archive, dataType, exploreDomain, ...props }) => {
  const [hashCellWidth, setHashCellWidth] = useState<number>()
  const hashDivRef = useRef<HTMLDivElement>(null)

  const theme = useTheme()
  const spacing = parseInt(theme.spacing(2).substring(-2))

  useEffect(() => {
    const cell = hashDivRef.current?.parentElement
    const row = cell?.parentElement
    const tbody = row?.parentElement
    const table = tbody?.parentElement
    const tableParent = table?.parentElement
    const checkWidth = (cell: HTMLElement) => {
      const smallestParentWidth = getSmallestParantWidth(cell)
      if (smallestParentWidth && row) {
        const remainderWidth = smallestParentWidth - getChildWidths(row) - spacing
        if (cell.clientWidth > remainderWidth) {
          setHashCellWidth(remainderWidth)
        } else if (hashCellWidth === undefined) {
          setHashCellWidth(cell.clientWidth)
        }
      }
    }

    const getChildWidths = (row: HTMLElement) => {
      let width = 0
      let padding = 0
      for (let i = 1; i < (row?.childElementCount ?? 0); i++) {
        const item = row?.children.item(i)
        if (item) {
          width += item?.clientWidth ?? 0
          padding += parseInt(
            window.getComputedStyle(item, null)?.getPropertyValue('padding-left').replaceAll('px', '') ?? 0
          )
          padding += parseInt(
            window.getComputedStyle(item, null)?.getPropertyValue('padding-right').replaceAll('px', '') ?? 0
          )
        }
      }

      return width + padding
    }

    const onResize = () => {
      if (cell) {
        checkWidth(cell)
      }
    }

    if (tableParent && row && cell) {
      const smallestParentWidth = getSmallestParantWidth(row)
      if (smallestParentWidth) {
        checkWidth(cell)
        window.addEventListener('resize', onResize)
      }
    }
    return () => {
      window.removeEventListener('resize', onResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hashDivRef, spacing])

  return (
    <TableCell {...props}>
      <div ref={hashDivRef}>
        {exploreDomain ? (
          <Link
            style={{
              display: 'block',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: hashCellWidth,
            }}
            target="_blank"
            href={`${exploreDomain}/archive/${archive}/${dataType}/hash/${hash}`}
          >
            {hash}
          </Link>
        ) : (
          <LinkEx
            style={{
              display: 'block',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: hashCellWidth,
            }}
            to={`/archive/${archive}/${dataType}/hash/${hash}`}
          >
            {hash}
          </LinkEx>
        )}
      </div>
    </TableCell>
  )
}
