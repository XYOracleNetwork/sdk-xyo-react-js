import { Container, Typography, useTheme } from '@material-ui/core'
import React from 'react'
import { Helmet } from 'react-helmet'

import { FlexCol, FlexRow } from '../FlexBox'
import BasePageProps from './BasePageProps'

const BasePage: React.FC<BasePageProps> = (props) => {
  const {
    disableGutters,
    children,
    beta,
    container,
    hideFooter,
    appFooter,
    appBar,
    hideAppBar,
    noindex = false,
    title,
    ...baseProps
  } = props

  const theme = useTheme()

  return (
    <FlexCol
      justifyContent="flex-start"
      color={theme.palette.text.primary}
      alignItems="stretch"
      width="100vw"
      minHeight="100vh"
      {...baseProps}
    >
      <Helmet title={title}>{noindex ? <meta content="noindex" name="robots" /> : null}</Helmet>
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
          style={{ alignItems: 'stretch', display: 'flex', flexGrow: 1 }}
          maxWidth={container}
          disableGutters={disableGutters}
        >
          {children}
        </Container>
      ) : (
        children
      )}
      {hideFooter ? null : <footer>{appFooter}</footer>}
    </FlexCol>
  )
}

export default BasePage
