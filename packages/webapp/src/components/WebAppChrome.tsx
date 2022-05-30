import { CssBaseline } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexGrowCol, InvertableThemeProvider } from '@xylabs/sdk-react'
import { ApplicationAppBar } from '@xyo-network/react-appbar'
import { ErrorBoundary, ErrorPage, Footer, useAppSettings } from '@xyo-network/react-shared'
import { appThemeOptions, partialDarkThemeOptions } from '@xyo-network/react-theme'
import { ReactNode } from 'react'
import { Helmet } from 'react-helmet'

export interface WebAppChromeProps extends FlexBoxProps {
  appName: string
  footer?: ReactNode
  appbar?: ReactNode
  errorPage?: ReactNode
}

export const WebAppChrome: React.FC<WebAppChromeProps> = ({ errorPage, appbar, footer, children, appName, ...props }) => {
  const { darkMode } = useAppSettings()

  return (
    <InvertableThemeProvider dark={darkMode} options={appThemeOptions} darkOptions={partialDarkThemeOptions}>
      <CssBaseline />
      <Helmet defaultTitle={appName} titleTemplate={`%s | ${appName}`}>
        <meta content="website" property="og:type" />
      </Helmet>
      <FlexCol alignItems="stretch" height="100vh" {...props}>
        {appbar ?? <ApplicationAppBar />}
        <FlexGrowCol overflow="hidden" justifyContent="flex-start" alignItems="stretch">
          <ErrorBoundary fallback={errorPage ?? <ErrorPage />}>{children}</ErrorBoundary>
        </FlexGrowCol>
        {footer ?? <Footer dynamicHeight />}
      </FlexCol>
    </InvertableThemeProvider>
  )
}
