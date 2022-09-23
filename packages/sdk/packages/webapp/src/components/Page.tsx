import { Container, ContainerProps, styled } from '@mui/material'
import { FlexBoxProps, FlexGrowCol } from '@xylabs/react-flexbox'
import { useUserEvents } from '@xylabs/react-pixel'
import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router-dom'

import { WebAppBody, WebAppBodyProps } from './Body'

const WebAppPageRoot = styled(FlexGrowCol, {
  name: 'WebAppPage',
  shouldForwardProp: (propName) => propName !== 'scrollingBreakpoint',
  slot: 'Root',
})<WebAppPageProps>(({ theme, scrollingBreakpoint = 'sm' }) => ({
  alignItems: 'stretch',
  inset: 'unset',
  justifyContent: 'start',
  maxWidth: '100vw',
  position: 'relative',
  [theme.breakpoints.down(scrollingBreakpoint)]: {
    inset: 0,
    position: 'absolute',
  },
}))

export interface WebAppPageProps extends WebAppBodyProps, FlexBoxProps {
  container?: ContainerProps['maxWidth'] | 'none'
  disableGutters?: boolean
}

export const WebAppPage: React.FC<WithChildren<WebAppPageProps>> = ({
  disableGutters,
  disableBreadcrumbGutter,
  title,
  container,
  children,
  breadcrumbs,
  scrollingBreakpoint,
  devMode,
  ...props
}) => {
  const userEvents = useUserEvents()
  const { pathname } = useLocation()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      await userEvents?.viewContent({ name: title ?? 'NodeBasePage', path: location.pathname })
    },
    [pathname, title, userEvents],
  )

  if (devMode) {
    return (
      <WebAppPageRoot scrollingBreakpoint={scrollingBreakpoint} {...props}>
        <Helmet title={title} />
        {container && container !== 'none' ? (
          <Container
            disableGutters={disableGutters}
            style={{ alignItems: 'stretch', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'flex-start' }}
            maxWidth={container}
          >
            <WebAppBody
              devMode={devMode}
              disableBreadcrumbGutter={disableBreadcrumbGutter}
              breadcrumbs={breadcrumbs}
              scrollingBreakpoint={scrollingBreakpoint}
              {...props}
            >
              {children}
            </WebAppBody>
          </Container>
        ) : (
          <WebAppBody
            devMode={devMode}
            disableBreadcrumbGutter={disableBreadcrumbGutter}
            breadcrumbs={breadcrumbs}
            scrollingBreakpoint={scrollingBreakpoint}
            paddingX={disableGutters ? 0 : 1}
            {...props}
          >
            {children}
          </WebAppBody>
        )}
      </WebAppPageRoot>
    )
  } else {
    return (
      
    )
  }

}

/** @deprecated use WebAppPagePage instead */
export const FlexPage = WebAppPage
