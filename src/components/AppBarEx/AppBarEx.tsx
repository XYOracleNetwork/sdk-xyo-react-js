import { AppBar, AppBarProps, Container, Toolbar, ToolbarProps, useTheme } from '@material-ui/core'
import { ReactElement } from 'react'

import { FlexGrowRow } from '../FlexBox'

interface Props extends AppBarProps {
  container?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  contextToolbar?: ReactElement<ToolbarProps>
  systemToolbar?: ReactElement<ToolbarProps>
}

const AppBarEx: React.FC<Props> = (props) => {
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
