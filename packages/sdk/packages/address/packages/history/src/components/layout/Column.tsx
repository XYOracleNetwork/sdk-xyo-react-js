import { Grid, GridProps, styled } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { WithChildren } from '@xylabs/react-shared'
import { forwardRef } from 'react'

interface AddressHistoryColumnProps extends GridProps, WithChildren {}

const GridColumn = styled(Grid, { name: 'GridColumn' })(() => ({
  overflow: 'hidden',
  position: 'relative',
}))

const Scrollable = styled(FlexCol, { name: 'Scrollable' })(({ theme }) => ({
  alignItems: 'stretch',
  inset: 0,
  justifyContent: 'start',
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    inset: 'unset',
    position: 'relative',
  },
}))

const ScrollableGridColumn = forwardRef<HTMLDivElement, AddressHistoryColumnProps>(({ children, ...props }, ref) => {
  return (
    <GridColumn ref={ref} {...props}>
      <Scrollable>{children}</Scrollable>
    </GridColumn>
  )
})

ScrollableGridColumn.displayName = 'ScrollableGridColumn'

export { ScrollableGridColumn }
