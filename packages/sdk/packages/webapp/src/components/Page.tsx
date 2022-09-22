import { Container, ContainerProps, Theme, useMediaQuery } from '@mui/material'
import { FlexBoxProps, FlexGrowCol } from '@xylabs/react-flexbox'
import { useUserEvents } from '@xylabs/react-pixel'
import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router-dom'

import { WebAppBody, WebAppBodyProps } from './Body'

export interface WebAppPageProps extends WebAppBodyProps, FlexBoxProps {
  container?: ContainerProps['maxWidth'] | 'none'
  disableGutters?: boolean
}

export const WebAppPage: React.FC<WithChildren<WebAppPageProps>> = ({ disableGutters, title, container, children, ...props }) => {
  const userEvents = useUserEvents()
  const { pathname } = useLocation()
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      await userEvents?.viewContent({ name: title ?? 'NodeBasePage', path: location.pathname })
    },
    [pathname, title, userEvents],
  )

  const appContentStyles: FlexBoxProps = {
    position: isMobile ? 'absolute' : 'relative',
    sx: { inset: isMobile ? '0' : 'unset' },
  }

  return (
    <FlexGrowCol id="webapp-page-flex" alignItems="stretch" justifyContent="flex-start" maxWidth="100vw" {...appContentStyles}>
      <Helmet title={title} />
      {container && container !== 'none' ? (
        <Container
          disableGutters={disableGutters}
          style={{ alignItems: 'stretch', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'flex-start' }}
          maxWidth={container}
        >
          <WebAppBody {...props}>{children}</WebAppBody>
        </Container>
      ) : (
        <WebAppBody paddingX={disableGutters ? 0 : 1} {...props}>
          {children}
        </WebAppBody>
      )}
    </FlexGrowCol>
  )
}

/** @deprecated use WebAppPagePage instead */
export const FlexPage = WebAppPage
