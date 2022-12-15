import { Grid, GridProps, styled } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { WithChildren } from '@xylabs/react-shared'
import { forwardRef } from 'react'

export interface AddressHistoryColumnProps extends GridProps, WithChildren {
  scrollableProps?: FlexBoxProps
}

const GridColumn = styled(Grid, { name: 'GridColumn' })(() => ({
  position: 'relative',
}))

const Scrollable = styled(FlexCol, { name: 'Scrollable' })(({ theme }) => ({
  alignItems: 'stretch',
  inset: 0,
  justifyContent: 'start',
  overflow: 'scroll',
  position: 'absolute',
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
