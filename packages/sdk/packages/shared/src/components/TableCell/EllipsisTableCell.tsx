import { styled, TableCell, TableCellProps } from '@mui/material'
import { LinkEx } from '@xylabs/react-link'
import type { WithChildren } from '@xylabs/react-shared'
import { forwardRef, useMemo } from 'react'
import { To } from 'react-router-dom-6'

import { EllipsizeBox } from '../Ellipsize'

const EllipsisTableCellRoot = styled(TableCell, {
  name: 'EllipsisTableCell',
  shouldForwardProp: (prop) => prop !== 'width',
  slot: 'Root',
})(({ width = '100%' }) => ({
  width,
}))

export interface EllipsisTableCellProps extends TableCellProps {
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

export const EllipsisTableCellWithRef: React.FC<WithChildren<EllipsisTableCellProps>> = forwardRef(
  ({ children, href, link = false, to, value, ...props }, ref) => {
    const data = useMemo(() => {
      if (children) {
        return children
      }
      if (href || link || to) {
        return (
          <LinkEx title={value} to={to} href={href} target={href ? '_blank' : undefined}>
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
