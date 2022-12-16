import { Grid, GridProps, styled } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { WithChildren } from '@xylabs/react-shared'
import { forwardRef, ReactNode } from 'react'

export interface AddressHistoryColumnProps extends GridProps, WithChildren {
  scrollableProps?: FlexBoxProps
  heading?: ReactNode
}

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

const ScrollableGridColumn = forwardRef<HTMLDivElement, AddressHistoryColumnProps>(({ children, heading, scrollableProps, ...props }, ref) => {
  return (
    <Grid ref={ref} {...props}>
      {heading}
      <FlexCol height="100%" width="100%">
        <Scrollable {...scrollableProps}>{children}</Scrollable>
      </FlexCol>
    </Grid>
  )
})

ScrollableGridColumn.displayName = 'ScrollableGridColumn'

export { ScrollableGridColumn }
