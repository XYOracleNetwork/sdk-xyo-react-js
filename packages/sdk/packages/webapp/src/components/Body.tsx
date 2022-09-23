import { Breakpoint, styled } from '@mui/material'
import { FlexBoxProps, FlexGrowCol, FlexRow } from '@xylabs/react-flexbox'
import React, { ReactNode } from 'react'

const WebAppBodyName = 'WebAppBody'

const WebAppBodyRoot = styled(FlexGrowCol, {
  name: WebAppBodyName,
  slot: 'Root',
})<WebAppBodyProps>(({ spacing, theme, scrollingBreakpoint = 'sm' }) => ({
  alignItems: 'stretch',
  gap: 1,
  justifyContent: 'flex-start',
  overflow: 'hidden',
  paddingY: spacing,
  [theme.breakpoints.down(scrollingBreakpoint)]: {
    overflow: 'scroll',
  },
}))

const WebAppBodyBreadcrumb = styled(FlexRow, {
  name: WebAppBodyName,
  slot: 'Breadcrumb',
})<WebAppBodyProps>(({ disableBreadcrumbGutter, spacing }) => ({
  justifyContent: 'start',
  marginX: disableBreadcrumbGutter ? 0 : spacing,
}))

const WebAppBodyScrollableWrapper = styled(FlexGrowCol, {
  name: WebAppBodyName,
  slot: 'ScrollableWrapper',
})<WebAppBodyProps>(() => ({}))

const WebAppBodyScrollable = styled(FlexGrowCol, {
  name: WebAppBodyName,
  slot: 'Scrollable',
})<WebAppBodyProps>(({ theme, scrollingBreakpoint = 'sm' }) => ({
  alignItems: 'stretch',
  inset: 0,
  justifyContent: 'start',
  position: 'absolute',
  [theme.breakpoints.down(scrollingBreakpoint)]: {
    inset: 'unset',
    position: 'relative',
  },
}))

export interface WebAppBodyProps extends FlexBoxProps {
  breadcrumbs?: ReactNode
  disableBreadcrumbGutter?: boolean
  spacing?: string | number
  scrollingBreakpoint?: Breakpoint
  devMode?: boolean
}

export const WebAppBody: React.FC<WebAppBodyProps> = ({
  devMode,
  children,
  breadcrumbs,
  disableBreadcrumbGutter,
  scrollingBreakpoint,
  spacing,
  ...props
}) => {
  if (devMode) {
    return (
      <WebAppBodyRoot scrollingBreakpoint={scrollingBreakpoint} spacing={spacing} {...props}>
        <WebAppBodyBreadcrumb disableBreadcrumbGutter={disableBreadcrumbGutter} spacing={spacing}>
          {breadcrumbs}
        </WebAppBodyBreadcrumb>
        <WebAppBodyScrollableWrapper>
          <WebAppBodyScrollable scrollingBreakpoint={scrollingBreakpoint}>{children}</WebAppBodyScrollable>
        </WebAppBodyScrollableWrapper>
      </WebAppBodyRoot>
    )
  } else {
    return (
      <FlexGrowCol gap={1} paddingY={spacing} justifyContent="flex-start" alignItems="stretch" {...props}>
        <FlexRow justifyContent="flex-start" marginX={disableBreadcrumbGutter ? 0 : spacing}>
          {breadcrumbs}
        </FlexRow>
        {children}
      </FlexGrowCol>
    )
  }
}
