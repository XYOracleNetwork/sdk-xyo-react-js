import type { Breakpoint } from '@mui/material'
import { styled } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexGrowCol, FlexRow } from '@xylabs/react-flexbox'
import type { ReactNode } from 'react'
import React from 'react'

import { fixedContent, scrollableContent } from './lib/index.ts'

const WebAppBodyName = 'WebAppBody'
const propsNotForwarded = new Set(['mobileScrollingBreakpoint', 'variant', 'spacing', 'disableBreadcrumbGutter'])
const defaultStyledOptions = { shouldForwardProp: (prop: string) => !propsNotForwarded.has(prop) }

const WebAppBodyRoot = styled(FlexGrowCol, {
  ...defaultStyledOptions,
  name: WebAppBodyName,
  slot: 'Root',
})<WebAppBodyProps>(({
  spacing, theme, mobileScrollingBreakpoint = 'sm', variant,
}) => {
  const scrollable = variant === 'scrollable'
  return theme.unstable_sx({
    alignItems: 'stretch',
    gap: 1,
    justifyContent: 'flex-start',
    overflowX: 'visible',
    overflowY: scrollable ? 'scroll' : 'hidden',
    paddingY: spacing,
    [theme.breakpoints.down(mobileScrollingBreakpoint)]: { overflowY: 'scroll' },
  })
})

const WebAppBodyBreadcrumb = styled(FlexRow, {
  ...defaultStyledOptions,
  name: WebAppBodyName,
  slot: 'Breadcrumb',
})<WebAppBodyProps>(({
  theme, disableBreadcrumbGutter, spacing,
}) =>
  theme.unstable_sx({
    justifyContent: 'start',
    marginX: disableBreadcrumbGutter ? 0 : spacing,
  }))

const WebAppBodyScrollableWrapper = styled(FlexGrowCol, {
  name: WebAppBodyName,
  slot: 'ScrollableWrapper',
})<WebAppBodyProps>(() => ({ alignItems: 'stretch' }))

const WebAppBodyScrollable = styled(FlexGrowCol, {
  ...defaultStyledOptions,
  name: WebAppBodyName,
  slot: 'Scrollable',
})<WebAppBodyProps>(({
  theme, mobileScrollingBreakpoint = 'sm', variant,
}) => {
  const props = variant === 'scrollable' ? scrollableContent : fixedContent
  return {
    ...props,
    alignItems: 'stretch',
    justifyContent: 'start',
    [theme.breakpoints.down(mobileScrollingBreakpoint)]: {
      inset: 'unset',
      position: 'relative',
    },
  }
})

export interface WebAppBodyProps extends FlexBoxProps {
  breadcrumbs?: ReactNode
  disableBreadcrumbGutter?: boolean
  mobileScrollingBreakpoint?: Breakpoint
  spacing?: string | number
  variant?: 'scrollable' | 'fixed'
}

export const WebAppBody: React.FC<WebAppBodyProps> = ({
  children,
  breadcrumbs,
  disableBreadcrumbGutter,
  mobileScrollingBreakpoint,
  spacing = 1,
  variant,
  ...props
}) => {
  return (
    <WebAppBodyRoot mobileScrollingBreakpoint={mobileScrollingBreakpoint} spacing={spacing} variant={variant} {...props}>
      {breadcrumbs
        ? (
            <WebAppBodyBreadcrumb disableBreadcrumbGutter={disableBreadcrumbGutter} spacing={spacing}>
              {breadcrumbs}
            </WebAppBodyBreadcrumb>
          )
        : null}
      <WebAppBodyScrollableWrapper>
        <WebAppBodyScrollable mobileScrollingBreakpoint={mobileScrollingBreakpoint} variant={variant}>
          {children}
        </WebAppBodyScrollable>
      </WebAppBodyScrollableWrapper>
    </WebAppBodyRoot>
  )
}
