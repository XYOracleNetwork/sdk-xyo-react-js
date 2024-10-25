import type { ContainerProps } from '@mui/material'
import { Container, styled } from '@mui/material'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexGrowCol } from '@xylabs/react-flexbox'
import { useUserEvents } from '@xylabs/react-pixel'
import type { PropsWithChildren } from 'react'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router-dom'

import type { WebAppBodyProps } from './Body.tsx'
import { WebAppBody } from './Body.tsx'
import { fixedWrap, scrollableWrap } from './lib/index.ts'

const WebAppPageRoot = styled(FlexGrowCol, {
  name: 'WebAppPage',
  shouldForwardProp: propName => propName !== 'mobileScrollingBreakpoint' && propName !== 'variant',
  slot: 'Root',
})<WebAppPageProps>(({
  theme, mobileScrollingBreakpoint = 'sm', variant,
}) => {
  const props = variant === 'scrollable' ? scrollableWrap : fixedWrap
  return {
    ...props,
    alignItems: 'stretch',
    justifyContent: 'start',
    maxWidth: '100vw',
    [theme.breakpoints.down(mobileScrollingBreakpoint)]: {
      inset: 0,
      position: 'absolute',
    },
  }
})

export interface WebAppPageProps extends WebAppBodyProps, FlexBoxProps {
  container?: ContainerProps['maxWidth'] | 'none'
  disableGutters?: boolean
}

export const WebAppPage: React.FC<PropsWithChildren<WebAppPageProps>> = ({
  disableGutters,
  disableBreadcrumbGutter,
  title,
  container,
  children,
  breadcrumbs,
  mobileScrollingBreakpoint,
  variant = 'scrollable',
  ...props
}) => {
  const userEvents = useUserEvents()
  const { pathname } = useLocation()

  useAsyncEffect(
    async () => {
      await userEvents?.viewContent({ name: title ?? 'NodeBasePage', path: location.pathname })
    },
    [pathname, title, userEvents],
  )

  return (
    <WebAppPageRoot mobileScrollingBreakpoint={mobileScrollingBreakpoint} variant={variant} {...props}>
      <Helmet title={title} />
      {container && container !== 'none'
        ? (
            <Container
              disableGutters={disableGutters}
              style={{
                alignItems: 'stretch', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'flex-start',
              }}
              maxWidth={container}
            >
              <WebAppBody
                disableBreadcrumbGutter={disableBreadcrumbGutter}
                breadcrumbs={breadcrumbs}
                mobileScrollingBreakpoint={mobileScrollingBreakpoint}
                variant={variant}
                {...props}
              >
                {children}
              </WebAppBody>
            </Container>
          )
        : (
            <WebAppBody
              disableBreadcrumbGutter={disableBreadcrumbGutter}
              breadcrumbs={breadcrumbs}
              mobileScrollingBreakpoint={mobileScrollingBreakpoint}
              paddingX={disableGutters ? 0 : 1}
              variant={variant}
              {...props}
            >
              {children}
            </WebAppBody>
          )}
    </WebAppPageRoot>
  )
}

/** @deprecated use WebAppPagePage instead */
export const FlexPage = WebAppPage
