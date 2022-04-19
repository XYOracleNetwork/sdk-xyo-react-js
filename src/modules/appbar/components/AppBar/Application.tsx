import { AppBar, AppBarProps, Container, Toolbar, ToolbarProps, useMediaQuery, useTheme } from '@mui/material'
import { FlexGrowRow, FlexRow, InvertableThemeProvider } from '@xylabs/sdk-react'
import React, { ReactElement } from 'react'

import { ContextToolbar, SystemToolbar } from '../Toolbar'

export interface ApplicationAppBarProps extends AppBarProps {
  contextToolbar?: ReactElement<ToolbarProps>
  systemToolbar?: ReactElement<ToolbarProps>
  responsive?: boolean
}

export const ApplicationAppBar: React.FC<ApplicationAppBarProps> = ({ systemToolbar, contextToolbar, children, responsive = true, ...props }) => {
  const { breakpoints } = useTheme()
  const belowSm = useMediaQuery(breakpoints.down('sm'))
  const theme = useTheme()
  return (
    <AppBar color="primary" position="sticky" {...props}>
      <InvertableThemeProvider
        darkOptions={{}}
        options={{
          palette: {
            mode: 'dark',
            primary: {
              contrastText: theme.palette.getContrastText(theme.palette.primary.main),
              main: theme.palette.primary.main,
            },
            secondary: {
              contrastText: theme.palette.getContrastText(theme.palette.secondary.main),
              main: theme.palette.secondary.main,
            },
          },
        }}
      >
        <Container maxWidth="xl" disableGutters>
          <FlexRow flexWrap="nowrap" justifyContent="flex-start">
            {contextToolbar ?? <ContextToolbar version />}
            <FlexGrowRow>{belowSm && responsive ? null : children}</FlexGrowRow>
            {systemToolbar ?? <SystemToolbar />}
          </FlexRow>
          {belowSm && children && responsive ? <Toolbar>{children}</Toolbar> : null}
        </Container>
      </InvertableThemeProvider>
    </AppBar>
  )
}
