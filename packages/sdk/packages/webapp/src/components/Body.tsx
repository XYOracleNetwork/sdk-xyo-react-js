import { Breakpoint, styled } from '@mui/material'
import { FlexBoxProps, FlexGrowCol, FlexRow } from '@xylabs/react-flexbox'
import React, { ReactNode } from 'react'

import { fixedContent, scrollableContent } from './lib'

const WebAppBodyName = 'WebAppBody'
const propsNotForwarded = ['mobileScrollingBreakpoint', 'variant', 'spacing', 'disableBreadcrumbGutter']
const defaultStyledOptions = {
  shouldForwardProp: (prop: string) => !propsNotForwarded.includes(prop),
}

const WebAppBodyRoot = styled(FlexGrowCol, {
  ...defaultStyledOptions,
  name: WebAppBodyName,
  slot: 'Root',
})<WebAppBodyProps>(({ spacing, theme, mobileScrollingBreakpoint = 'sm', variant }) => {
  const scrollable = variant === 'scrollable'
  return theme.unstable_sx({
    alignItems: 'stretch',
    gap: 1,
    justifyContent: 'flex-start',
    overflow: scrollable ? 'scroll' : 'hidden',
    paddingY: spacing,
    [theme.breakpoints.down(mobileScrollingBreakpoint)]: {
      overflow: 'scroll',
    },
  })
})

const WebAppBodyBreadcrumb = styled(FlexRow, {
  ...defaultStyledOptions,
  name: WebAppBodyName,
  slot: 'Breadcrumb',
})<WebAppBodyProps>(({ theme, disableBreadcrumbGutter, spacing }) =>
  theme.unstable_sx({
    justifyContent: 'start',
    marginX: disableBreadcrumbGutter ? 0 : spacing,
  }),
)

const WebAppBodyScrollableWrapper = styled(FlexGrowCol, {
  name: WebAppBodyName,
  slot: 'ScrollableWrapper',
})<WebAppBodyProps>(() => ({
  alignItems: 'stretch',
}))

const WebAppBodyScrollable = styled(FlexGrowCol, {
  ...defaultStyledOptions,
  name: WebAppBodyName,
  slot: 'Scrollable',
})<WebAppBodyProps>(({ theme, mobileScrollingBreakpoint = 'sm', variant }) => {
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
      {breadcrumbs ? (
        <WebAppBodyBreadcrumb disableBreadcrumbGutter={disableBreadcrumbGutter} spacing={spacing}>
          {breadcrumbs}
        </WebAppBodyBreadcrumb>
      ) : null}
      <WebAppBodyScrollableWrapper>
        <WebAppBodyScrollable mobileScrollingBreakpoint={mobileScrollingBreakpoint} variant={variant}>
          {children}
        </WebAppBodyScrollable>
      </WebAppBodyScrollableWrapper>
    </WebAppBodyRoot>
  )
}
