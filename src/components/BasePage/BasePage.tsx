import { Container, Typography, useTheme } from '@material-ui/core'
import React from 'react'
import { Helmet } from 'react-helmet'

import { FlexCol, FlexGrowCol, FlexRow } from '../FlexBox'
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
      {appBar}
      {beta ? (
        <FlexRow margin={1}>
          <Typography variant="body1">
            Important: This page is a Beta page. It is possible that some information may not be correct.
          </Typography>
        </FlexRow>
      ) : null}
      {container ? (
        <Container component={FlexGrowCol} maxWidth={container} alignItems="stretch" disableGutters={disableGutters}>
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
