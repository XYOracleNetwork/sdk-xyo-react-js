import { Divider, Paper } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexGrowCol, FlexGrowRow } from '@xylabs/react-flexbox'
import { WebAppNavigationType } from '@xyo-network/react-app-settings'
import { ApplicationAppBar, SystemToolbar } from '@xyo-network/react-appbar'
import { Footer } from '@xyo-network/react-footer'
import { ErrorBoundary } from '@xyo-network/react-shared'
import { ReactNode } from 'react'
import { Helmet } from 'react-helmet'

import { WebAppErrorPage } from './ErrorPage'

export interface WebAppChromeProps extends FlexBoxProps {
  appName: string
  appbar?: ReactNode
  errorPage?: ReactNode
  footer?: ReactNode
  footerElevation?: number
  menuItems?: ReactNode
  navigationType?: WebAppNavigationType
}

export const WebAppChrome: React.FC<WebAppChromeProps> = ({
  appName,
  appbar,
  children,
  errorPage,
  footer,
  footerElevation = 4,
  menuItems,
  navigationType = 'menu',
  ...props
}) => {
  return (
    <FlexCol id="web-chrome-flex" alignItems="stretch" overflow="hidden" height="100vh" {...props}>
      <Helmet defaultTitle={appName} titleTemplate={`%s | ${appName}`}>
        <meta content="website" property="og:type" />
      </Helmet>
      {appbar ?? <ApplicationAppBar systemToolbar={<SystemToolbar menuItems={navigationType === 'menu' ? menuItems : undefined} />} />}
      <FlexGrowRow id="sidebar-nav-flex" overflow="hidden" alignItems="stretch">
        {navigationType !== 'menu' ? (
          <>
            {menuItems}
            <Divider orientation="vertical" />
          </>
        ) : null}
        <FlexGrowCol id="main-flex" justifyContent="flex-start" alignItems="stretch">
          <ErrorBoundary fallback={errorPage ?? <WebAppErrorPage />}>{children}</ErrorBoundary>
        </FlexGrowCol>
      </FlexGrowRow>
      <FlexCol id="footer-flex" alignItems="stretch">
        <Paper elevation={footerElevation} square>
          {footer ?? <Footer dynamicHeight />}
        </Paper>
      </FlexCol>
    </FlexCol>
  )
}
