import type { GridProps } from '@mui/material'
import { Grid, styled } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol } from '@xylabs/react-flexbox'
import type { PropsWithChildren, ReactNode } from 'react'
import React, { forwardRef } from 'react'

export interface AddressHistoryColumnProps extends GridProps, PropsWithChildren {
  heading?: ReactNode
  scrollableProps?: FlexBoxProps
}

const GridColumn = styled(Grid, { name: 'GridColumn' })(() => ({
  display: 'flex',
  flexDirection: 'column',
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

const ScrollableGridColumn = forwardRef<HTMLDivElement, AddressHistoryColumnProps>(({
  children, heading, scrollableProps, ...props
}, ref) => {
  return (
    <GridColumn ref={ref} {...props}>
      {heading}
      <FlexCol height="100%" width="100%">
        <Scrollable {...scrollableProps}>{children}</Scrollable>
      </FlexCol>
    </GridColumn>
  )
})

ScrollableGridColumn.displayName = 'ScrollableGridColumn'

export { ScrollableGridColumn }
