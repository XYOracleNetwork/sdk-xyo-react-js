import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@mui/icons-material'
import { Container, Fab, ScopedCssBaseline, Typography, useTheme } from '@mui/material'
import React from 'react'
import { Helmet } from 'react-helmet'

import { CookieConsent } from '../CookieConsent'
import { FlexCol, FlexRow } from '../FlexBox'
import { InvertableThemeProvider } from '../InvertableThemeProvider'
import ScrollToTopButton from '../ScrollToTopButton'
import BasePageProps from './BasePageProps'

const BasePage: React.FC<BasePageProps> = ({
  disableGutters,
  children,
  beta,
  container,
  hideFooter,
  appFooter,
  appBar,
  cookieConsent,
  hideAppBar,
  noindex = false,
  scrollToTopButton = false,
  title,
  ...props
}) => {
  const theme = useTheme()
  const scrollToTopAnchorId = 'scroll-to-top-anchor'

  return (
    <FlexCol
      justifyContent="flex-start"
      color={theme.palette.text.primary}
      alignItems="stretch"
      width="100vw"
      minHeight="100vh"
      {...props}
    >
      <Helmet title={title}>{noindex ? <meta content="noindex" name="robots" /> : null}</Helmet>
      {scrollToTopButton ? <div id={scrollToTopAnchorId} /> : null}
      {hideAppBar ? null : appBar}
      {beta ? (
        <FlexRow
          margin={1}
          position="absolute"
          top={0}
          left={0}
          bgcolor="#cccccc88"
          paddingX={1}
          style={{ opacity: 0.5 }}
        >
          <Typography variant="body2">
            Important: This page is a Beta page. It is possible that some information may not be correct.
          </Typography>
        </FlexRow>
      ) : null}
      {container ? (
        <Container
          style={{ alignItems: 'stretch', display: 'flex', flexDirection: 'column', flexGrow: 1 }}
          maxWidth={container}
          disableGutters={disableGutters}
        >
          {children}
        </Container>
      ) : (
        children
      )}
      {hideFooter ? null : <footer>{appFooter}</footer>}
      {cookieConsent ?? (
        <ScopedCssBaseline>
          <InvertableThemeProvider invert>
            <CookieConsent borderRadius={0} />
          </InvertableThemeProvider>
        </ScopedCssBaseline>
      )}
      {scrollToTopButton ? (
        <ScrollToTopButton anchorId={scrollToTopAnchorId}>
          <Fab aria-label="scroll to top" color="secondary" size="small">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollToTopButton>
      ) : null}
    </FlexCol>
  )
}

export default BasePage
