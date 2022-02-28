import { AppBar, AppBarProps, Container, Toolbar, ToolbarProps, useMediaQuery, useTheme } from '@mui/material'
import { FlexGrowRow, FlexRow, InvertableThemeProvider } from '@xylabs/sdk-react'
import React, { ReactElement } from 'react'

import { ContextToolbar, SystemToolbar } from '../Toolbar'

export interface ApplicationAppBarProps extends AppBarProps {
  contextToolbar?: ReactElement<ToolbarProps>
  systemToolbar?: ReactElement<ToolbarProps>
}

export const ApplicationAppBar: React.FC<ApplicationAppBarProps> = ({
  systemToolbar,
  contextToolbar,
  children,
  ...props
}) => {
  const { breakpoints } = useTheme()
  const belowSm = useMediaQuery(breakpoints.down('sm'))
  return (
    <AppBar color="primary" position="sticky" enableColorOnDark {...props}>
      <InvertableThemeProvider dark>
        <Container maxWidth="xl" disableGutters>
          <FlexRow flexWrap="nowrap" justifyContent="flex-start">
            {contextToolbar ?? <ContextToolbar version />}
            <FlexGrowRow>{belowSm ? null : children}</FlexGrowRow>
            {systemToolbar ?? <SystemToolbar />}
          </FlexRow>
          {belowSm ? <Toolbar>{children}</Toolbar> : null}
        </Container>
      </InvertableThemeProvider>
    </AppBar>
  )
}
