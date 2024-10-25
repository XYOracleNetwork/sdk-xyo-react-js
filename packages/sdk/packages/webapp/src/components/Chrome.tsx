import { Divider, Paper } from '@mui/material'
import type { WebAppNavigationType } from '@xylabs/react-app-settings'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import {
  FlexCol, FlexGrowCol, FlexGrowRow,
} from '@xylabs/react-flexbox'
import { ApplicationAppBar, SystemToolbar } from '@xyo-network/react-appbar'
import { ErrorBoundary } from '@xyo-network/react-error'
import { Footer } from '@xyo-network/react-footer'
import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'
import { Helmet } from 'react-helmet'

import { WebAppErrorPage } from './ErrorPage.tsx'

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
  ({
    appName, appbar, children, errorBoundary, errorPage, footer, footerElevation = 4, menuItems, navigationType = 'menu', ...props
  }, ref) => {
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
