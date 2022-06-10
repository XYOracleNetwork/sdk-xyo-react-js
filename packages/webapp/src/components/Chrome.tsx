import { Paper } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexGrowCol } from '@xylabs/react-flexbox'
import { ApplicationAppBar } from '@xyo-network/react-appbar'
import { Footer } from '@xyo-network/react-footer'
import { ErrorBoundary } from '@xyo-network/react-shared'
import { ReactNode } from 'react'
import { Helmet } from 'react-helmet'

import { WebAppErrorPage } from './ErrorPage'

export interface WebAppChromeProps extends FlexBoxProps {
  appName: string
  footer?: ReactNode
  appbar?: ReactNode
  errorPage?: ReactNode
  footerElevation?: number
}

export const WebAppChrome: React.FC<WebAppChromeProps> = ({ footerElevation = 4, errorPage, appbar, footer, children, appName, ...props }) => {
  return (
    <FlexCol alignItems="stretch" height="100vh" {...props}>
      <Helmet defaultTitle={appName} titleTemplate={`%s | ${appName}`}>
        <meta content="website" property="og:type" />
      </Helmet>
      {appbar ?? <ApplicationAppBar />}
      <FlexGrowCol overflow="hidden" justifyContent="flex-start" alignItems="stretch">
        <ErrorBoundary fallback={errorPage ?? <WebAppErrorPage />}>{children}</ErrorBoundary>
      </FlexGrowCol>
      <Paper elevation={footerElevation} square>
        {footer ?? <Footer dynamicHeight />}
      </Paper>
    </FlexCol>
  )
}
