import { Grid, GridProps, styled } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { WithChildren } from '@xylabs/react-shared'
import { forwardRef } from 'react'

export interface AddressHistoryColumnProps extends GridProps, WithChildren {
  scrollableProps?: FlexBoxProps
}

const GridColumn = styled(Grid, { name: 'GridColumn' })(() => ({
  overflow: 'hidden',
  position: 'relative',
}))

const Scrollable = styled(FlexCol, { name: 'Scrollable' })(({ theme }) => ({
  alignItems: 'stretch',
  bottom: 0,
  justifyContent: 'start',
  // account for negative grid margins
  left: theme.spacing(3),
  overflowY: 'scroll',
  position: 'absolute',
  right: 0,
  // account for negative grid margins
  top: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    inset: 'unset',
    position: 'relative',
  },
}))

const ScrollableGridColumn = forwardRef<HTMLDivElement, AddressHistoryColumnProps>(({ children, scrollableProps, ...props }, ref) => {
  return (
    <GridColumn ref={ref} {...props}>
      <Scrollable {...scrollableProps}>{children}</Scrollable>
    </GridColumn>
  )
})

ScrollableGridColumn.displayName = 'ScrollableGridColumn'

export { ScrollableGridColumn }
