import { Divider, Paper } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexGrowCol, FlexGrowRow } from '@xylabs/react-flexbox'
import { WebAppNavigationType } from '@xyo-network/react-app-settings'
import { ApplicationAppBar, SystemToolbar } from '@xyo-network/react-appbar'
import { Footer } from '@xyo-network/react-footer'
import { ErrorBoundary } from '@xyo-network/react-shared'
import React, { forwardRef, ReactNode } from 'react'
import { Helmet } from 'react-helmet'

import { WebAppErrorPage } from './ErrorPage.js'

export interface WebAppChromeProps extends FlexBoxProps {
  appName: string
  appbar?: ReactNode
  errorBoundary?: boolean
  errorPage?: ReactNode
  footer?: ReactNode
  footerElevation?: number
  menuItems?: ReactNode
  navigationType?: WebAppNavigationType
}

export const WebAppChrome = forwardRef<HTMLDivElement, WebAppChromeProps>(
  ({ appName, appbar, children, errorBoundary, errorPage, footer, footerElevation = 4, menuItems, navigationType = 'menu', ...props }, ref) => {
    return (
      <FlexCol id="web-chrome-flex" alignItems="stretch" overflow="hidden" height="100vh" ref={ref} {...props}>
        <Helmet defaultTitle={appName} titleTemplate={`%s | ${appName}`}>
          <meta content="website" property="og:type" />
        </Helmet>
        {appbar ?? <ApplicationAppBar systemToolbar={<SystemToolbar menuItems={navigationType === 'menu' ? menuItems : undefined} />} />}
        <FlexGrowRow id="sidebar-nav-flex" overflow="hidden" alignItems="stretch">
          {navigationType === 'menu'
            ? null
            : (
                <>
                  {menuItems}
                  <Divider orientation="vertical" />
                </>
              )}
          <FlexGrowCol id="main-flex" justifyContent="flex-start" alignItems="stretch">
            {errorBoundary
              ? (
                  <ErrorBoundary
                    fallbackWithError={(error) => {
                      return errorPage ?? <WebAppErrorPage error={error} />
                    }}
                  >
                    {children}
                  </ErrorBoundary>
                )
              : children}
          </FlexGrowCol>
        </FlexGrowRow>
        <FlexCol id="footer-flex" alignItems="stretch">
          <Paper elevation={footerElevation} square>
            {footer ?? <Footer dynamicHeight />}
          </Paper>
        </FlexCol>
      </FlexCol>
    )
  },
)

WebAppChrome.displayName = 'WebAppChrome'
