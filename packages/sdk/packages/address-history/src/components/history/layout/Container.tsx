import { Grid, styled } from '@mui/material'
import { FlexGrowCol } from '@xylabs/react-flexbox'
import { WithChildren } from '@xylabs/react-shared'
import { forwardRef } from 'react'

const GridContainerWrap = styled(FlexGrowCol, { name: 'GridContainerWrap' })(({ theme }) => ({
  // Handles the negative margins used by the MUI grid system
  paddingBottom: theme.spacing(1),
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(1),
  paddingTop: theme.spacing(4),
}))

const GridContainer = styled(Grid, { name: 'GridContainer' })(({ theme }) => ({
  borderRadius: theme.spacing(1),
  flexGrow: 1,
  height: '100%',
  overflow: 'hidden',
}))

interface WrappedContainerProps extends WithChildren {
  spacing?: number
}

export const WrappedContainerWithRef: React.FC<WrappedContainerProps> = forwardRef(({ children, spacing }, ref) => (
  <GridContainerWrap ref={ref}>
    <GridContainer container spacing={spacing}>
      {children}
    </GridContainer>
  </GridContainerWrap>
))

WrappedContainerWithRef.displayName = 'WrappedContainerWithRef'

export const WrappedContainer = WrappedContainerWithRef
