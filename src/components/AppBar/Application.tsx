import { AppBar, AppBarProps, Container, ToolbarProps } from '@mui/material'
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
  return (
    <AppBar color="primary" position="sticky" enableColorOnDark {...props}>
      <InvertableThemeProvider dark>
        <Container maxWidth="xl" disableGutters>
          <FlexRow flexWrap="wrap" justifyContent="flex-start">
            {contextToolbar ?? <ContextToolbar version />}
            <FlexGrowRow>{children}</FlexGrowRow>
            {systemToolbar ?? <SystemToolbar />}
          </FlexRow>
        </Container>
      </InvertableThemeProvider>
    </AppBar>
  )
}
