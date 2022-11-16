import { styled, TableCell, TableCellProps } from '@mui/material'
import { LinkEx } from '@xylabs/react-link'
import { WithChildren } from '@xylabs/react-shared'
import { forwardRef } from 'react'
import { To } from 'react-router-dom'

import { EllipsizeBox } from '../Ellipsize'

const EllipsisTableCellRoot = styled(TableCell, {
  name: 'EllipsisTableCell',
  shouldForwardProp: (prop) => prop !== 'width',
  slot: 'Root',
})(({ width = '100%' }) => ({
  width,
}))

export interface EllipsisTableCellProps extends TableCellProps {
  /**
   * Width of the table cell.
   *
   * Note: When using percentages, this value can be different than what you expect
   * if used on a cell that is not the first cell in the first row.
   */
  width?: string | number
  href?: string
  to?: To
  link?: boolean
  value?: string
}

export const EllipsisTableCellWithRef: React.FC<WithChildren<EllipsisTableCellProps>> = forwardRef(
  ({ children, href, link = false, to, value, ...props }, ref) => {
    return (
      <EllipsisTableCellRoot ref={ref} {...props}>
        <EllipsizeBox>
          {children ? (
            children
          ) : href || to || link ? (
            <LinkEx title={value} to={to} href={href} target={href ? '_blank' : undefined} sx={{ ...(link && { cursor: 'pointer' }) }}>
              {value}
            </LinkEx>
          ) : (
            value
          )}
        </EllipsizeBox>
      </EllipsisTableCellRoot>
    )
  },
)

EllipsisTableCellWithRef.displayName = 'EllipsisTableCell'
export const EllipsisTableCell = EllipsisTableCellWithRef
