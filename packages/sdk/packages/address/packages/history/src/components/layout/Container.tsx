import { Grid, styled } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexGrowCol } from '@xylabs/react-flexbox'
import type { PropsWithChildren } from 'react'
import React, { forwardRef } from 'react'

const GridContainer = styled(Grid, { name: 'GridContainer' })(() => ({
  flexGrow: 1,
  height: '100%',
  overflow: 'hidden',
}))

export interface WrappedContainerProps extends FlexBoxProps, PropsWithChildren {
  spacing?: number
}

const WrappedContainer = forwardRef<HTMLDivElement, WrappedContainerProps>(({
  children, spacing, ...props
}, ref) => (
  <FlexGrowCol ref={ref} {...props}>
    <GridContainer container spacing={spacing}>
      {children}
    </GridContainer>
  </FlexGrowCol>
))

WrappedContainer.displayName = 'WrappedContainerWithRef'

export { WrappedContainer }
