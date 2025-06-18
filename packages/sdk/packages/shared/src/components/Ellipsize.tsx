import type {
  BoxProps, TypographyProps, TypographyTypeMap,
} from '@mui/material'
import {
  Box, styled, Typography,
} from '@mui/material'
import type { PropsWithChildren } from 'react'
import React from 'react'

import { useShareForwardedRef } from '../hooks/index.ts'

/**
 * Heavily inspired by - https://stackoverflow.com/a/30362531/2803259
 */

const ComponentName = 'Ellipsize'

export interface EllipsizeRootProps extends BoxProps {
  beforeLineHeight?: string | number
}

const EllipsizeRoot = styled(Box, {
  name: ComponentName,
  shouldForwardProp: prop => prop !== 'beforeLineHeight',
  slot: 'Root',
})<EllipsizeRootProps>(({ beforeLineHeight = 0 }) => ({
  '&': {
    // because the cell content ends up absolutely positioned, the cell doesn't know the content height.
    // the pseudo element with a hidden character establishes the proper height of the content and hides it
    ':before': {
      content: "'nbsp;'",
      display: 'block',
      // take the pseudo element out of the `display: block` flow so it won't push against our actual content
      float: 'left',
      lineHeight: beforeLineHeight,
      visibility: 'hidden',
    },
  },
}))

const EllipsizeInnerWrap = styled(Box, {
  name: ComponentName,
  slot: 'innerWrap',
})(() => ({ position: 'relative' }))

const EllipsizeContentWrap = styled(Typography, {
  name: ComponentName,
  shouldForwardProp: prop => prop !== 'ellipsisPosition',
  slot: 'contentWrap',
})<TypographyWithComponentProps>(({
  theme, ellipsisPosition, fontFamily,
}) => {
  return theme.unstable_sx({
    fontFamily: fontFamily ?? 'monospace',
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    ...(ellipsisPosition === 'start'
      ? {
          direction: 'rtl',
          textAlign: 'left',
        }
      : {}),
  })
})

export type TypographyWithComponentProps<D extends React.ElementType = TypographyTypeMap['defaultComponent'], P = {}> = TypographyProps<D, P> & {
  ellipsisPosition?: 'start' | 'end'
}

export interface EllipsizeBoxProps extends BoxProps {
  beforeLineHeight?: number | string
  disableSharedRef?: boolean
  ellipsisPosition?: 'start' | 'end'
  innerWrapProps?: BoxProps
  typographyProps?: TypographyWithComponentProps
}

export const EllipsizeBox = ({
  ref, innerWrapProps, children, ellipsisPosition = 'start', disableSharedRef, typographyProps, ...props
}: PropsWithChildren<EllipsizeBoxProps>) => {
  const sharedRef = useShareForwardedRef(ref)
  const { sx: innerWrapSx, ...remainingInnerWrapProps } = innerWrapProps ?? {}

  return (
    <EllipsizeRoot ref={sharedRef} {...props}>
      <EllipsizeInnerWrap
        {...remainingInnerWrapProps}
        sx={{
          alignItems: 'center', display: 'flex', ...innerWrapSx,
        }}
      >
        <EllipsizeContentWrap component="span" ellipsisPosition={ellipsisPosition} variant="body2" {...typographyProps}>
          {children}
        </EllipsizeContentWrap>
      </EllipsizeInnerWrap>
    </EllipsizeRoot>
  )
}
EllipsizeBox.displayName = 'EllipsizeBox'
