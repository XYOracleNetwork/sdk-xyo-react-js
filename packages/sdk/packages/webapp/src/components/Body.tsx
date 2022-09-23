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
}

export const WebAppBody: React.FC<WebAppBodyProps> = ({ children, breadcrumbs, disableBreadcrumbGutter, scrollingBreakpoint, ...props }) => {
  return (
    <WebAppBodyRoot scrollingBreakpoint={scrollingBreakpoint} {...props}>
      <WebAppBodyBreadcrumb disableBreadcrumbGutter={disableBreadcrumbGutter}>{breadcrumbs}</WebAppBodyBreadcrumb>
      <WebAppBodyScrollableWrapper>
        <WebAppBodyScrollable scrollingBreakpoint={scrollingBreakpoint}>{children}</WebAppBodyScrollable>
      </WebAppBodyScrollableWrapper>
    </WebAppBodyRoot>
  )
}
