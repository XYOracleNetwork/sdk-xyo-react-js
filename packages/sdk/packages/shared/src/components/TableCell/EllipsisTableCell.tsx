import type { TableCellProps } from '@mui/material'
import { styled, TableCell } from '@mui/material'
import { asLinkHrefOrToProps, LinkEx } from '@xylabs/react-link'
import React, { forwardRef, useMemo } from 'react'
import type { To } from 'react-router-dom'

import { EllipsizeBox } from '../Ellipsize.tsx'

const EllipsisTableCellRoot = styled(TableCell, {
  name: 'EllipsisTableCell',
  shouldForwardProp: prop => prop !== 'width',
  slot: 'Root',
})(({ width = '100%' }) => ({ width }))

export interface EllipsisTableCellProps extends Omit<TableCellProps, 'ref'> {
  href?: string
  link?: boolean
  to?: To
  value?: string
  /**
   * Width of the table cell.
   *
   * Note: When using percentages, this value can be different than what you expect
   * if used on a cell that is not the first cell in the first row.
   */
  width?: string | number
}

export const EllipsisTableCellWithRef = forwardRef<HTMLElement, EllipsisTableCellProps>(
  ({
    children, href, link = false, to, value, ...props
  }, ref) => {
    const data = useMemo(() => {
      if (children) {
        return children
      }
      if (href || link || to) {
        return (
          <LinkEx title={value} {...asLinkHrefOrToProps({ to, href })} target={href ? '_blank' : undefined}>
            {value}
          </LinkEx>
        )
      }
      return value
    }, [children, href, link, to, value])
    return (
      <EllipsisTableCellRoot ref={ref} {...props}>
        <EllipsizeBox sx={{ cursor: link || to || href ? 'pointer' : 'inherit' }}>{data}</EllipsizeBox>
      </EllipsisTableCellRoot>
    )
  },
)

EllipsisTableCellWithRef.displayName = 'EllipsisTableCell'
export const EllipsisTableCell = EllipsisTableCellWithRef
