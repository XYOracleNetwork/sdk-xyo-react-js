import { styled, TableCell, TableCellProps } from '@mui/material'
import { LinkEx } from '@xylabs/react-link'
import { WithChildren } from '@xylabs/react-shared'
import { To } from 'react-router-dom'

/**
 * Heavily inspired by - https://stackoverflow.com/a/30362531/2803259
 */

const ComponentName = 'EllipsisTableCell'

const EllipsisTableCellRoot = styled(TableCell, {
  name: ComponentName,
  shouldForwardProp: (prop) => prop !== 'width',
  slot: 'Root',
})<EllipsisTableCellv2Props>(({ width = '100%' }) => ({
  '&': {
    // because the cell content ends up absolutely positioned, the cell doesn't know the content height.
    // the pseudo element with a hidden character establishes the proper height of the content and hides it
    ':before': {
      content: "'nbsp;'",
      display: 'block',
      // take the pseudo element out of the `display: block` flow so it won't push against our actual content
      float: 'left',
      visibility: 'hidden',
    },
    width,
  },
}))

const EllipsisTableCellInnerWrap = styled('div', {
  name: ComponentName,
  slot: 'innerWrap',
})(() => ({
  position: 'relative',
}))

const EllipsisTableCellContentWrap = styled('span', {
  name: ComponentName,
  slot: 'contentWrap',
})(() => ({
  left: 0,
  overflow: 'hidden',
  position: 'absolute',
  right: 0,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}))

export interface EllipsisTableCellv2Props extends TableCellProps {
  /**
   * Width of the table cell.
   *
   * Note: When using percentages, this value can be different than what you expect
   * if used on a cell that is not the first cell in the first row.
   */
  width?: string
  href?: string
  to?: To
  value?: string
}

/** Eventually rename and replace EllipsisTableCell  */
export const EllipsisTableCellv2: React.FC<WithChildren<EllipsisTableCellv2Props>> = ({ children, href, to, value, ...props }) => {
  return (
    <EllipsisTableCellRoot {...props}>
      <EllipsisTableCellInnerWrap>
        <EllipsisTableCellContentWrap>
          {children ? (
            children
          ) : href || to ? (
            <LinkEx to={to} href={href} target={href ? '_blank' : undefined}>
              {value}
            </LinkEx>
          ) : (
            value
          )}
        </EllipsisTableCellContentWrap>
      </EllipsisTableCellInnerWrap>
    </EllipsisTableCellRoot>
  )
}
