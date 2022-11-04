import { Grid, GridProps, Paper, styled } from '@mui/material'
import { WithChildren } from '@xylabs/react-shared'

interface AddressHistoryColumnProps extends GridProps, WithChildren {
  elevation?: number
}

const GridColumn = styled(Grid, { name: 'GridColumn' })(() => ({
  overflow: 'hidden',
  position: 'relative',
}))

const Scrollable = styled(Paper, { name: 'Scrollable' })(({ theme }) => ({
  alignItems: 'stretch',
  borderRadius: 0,
  display: 'flex',
  flexDirection: 'column',
  inset: 0,
  justifyContent: 'start',
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    inset: 'unset',
    position: 'relative',
  },
}))

export const ScrollableGridColumn: React.FC<AddressHistoryColumnProps> = ({ children, elevation, ...props }) => {
  return (
    <GridColumn {...props}>
      <Scrollable elevation={elevation}>{children}</Scrollable>
    </GridColumn>
  )
}
