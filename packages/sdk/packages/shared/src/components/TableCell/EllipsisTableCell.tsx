import { styled, TableCell, TableCellProps } from '@mui/material'
import { LinkEx } from '@xylabs/react-link'
import { WithChildren } from '@xylabs/react-shared'
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
  value?: string
}

export const EllipsisTableCell: React.FC<WithChildren<EllipsisTableCellProps>> = ({ children, href, to, value, ...props }) => {
  return (
    <EllipsisTableCellRoot {...props}>
      <EllipsizeBox>
        {children ? (
          children
        ) : href || to ? (
          <LinkEx to={to} href={href} target={href ? '_blank' : undefined}>
            {value}
          </LinkEx>
        ) : (
          value
        )}
      </EllipsizeBox>
    </EllipsisTableCellRoot>
  )
}
