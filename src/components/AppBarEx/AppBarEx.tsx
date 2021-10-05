import { AppBar, Container, Toolbar, useTheme } from '@mui/material'

import { FlexGrowRow } from '../FlexBox'
import AppBarExProps from './AppBarExProps'

const AppBarEx: React.FC<AppBarExProps> = (props) => {
  const { contextToolbar, systemToolbar, container, style, ...appbarProps } = props
  const theme = useTheme()

  const AppBarExInner: React.FC = () => {
    return (
      <FlexGrowRow justifyContent="space-between">
        {contextToolbar ?? <Toolbar />}
        {systemToolbar ?? <Toolbar />}
      </FlexGrowRow>
    )
  }

  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        display: 'flex',
        ...style,
      }}
      {...appbarProps}
    >
      {container ? (
        <Container maxWidth={container}>
          <AppBarExInner />
        </Container>
      ) : (
        <AppBarExInner />
      )}
    </AppBar>
  )
}

export default AppBarEx
