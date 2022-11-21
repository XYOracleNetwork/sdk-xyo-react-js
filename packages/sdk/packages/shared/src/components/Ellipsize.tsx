import { Box, BoxProps, experimental_sx as sx, styled, Typography, TypographyProps } from '@mui/material'
import { WithChildren } from '@xylabs/react-shared'
import React, { ElementType, forwardRef, useCallback, useState } from 'react'

/**
 * Heavily inspired by - https://stackoverflow.com/a/30362531/2803259
 */

const ComponentName = 'Ellipsize'

interface EllipsizeRootProps {
  beforeLineHeight?: string | number
}

const EllipsizeRoot = styled(Box, {
  name: ComponentName,
  shouldForwardProp: (prop) => prop !== 'beforeLineHeight',
  slot: 'Root',
})<EllipsizeRootProps>(({ beforeLineHeight }) => ({
  '&': {
    // because the cell content ends up absolutely positioned, the cell doesn't know the content height.
    // the pseudo element with a hidden character establishes the proper height of the content and hides it
    ':before': {
      content: "'nbsp;'",
      display: 'block',
      // take the pseudo element out of the `display: block` flow so it won't push against our actual content
      float: 'left',
      visibility: 'hidden',
      // since we are `display: block`, lineHeight is the height
      ...(beforeLineHeight && { lineHeight: beforeLineHeight }),
    },
  },
}))

const EllipsizeInnerWrap = styled(Box, {
  name: ComponentName,
  slot: 'innerWrap',
})(() => ({
  position: 'relative',
}))

const EllipsizeContentWrap = styled(Typography, {
  name: ComponentName,
  shouldForwardProp: (prop) => prop !== 'ellipsisPosition',
  slot: 'contentWrap',
})<TypographyWithComponentProps>(({ ellipsisPosition, fontFamily }) => {
  return sx({
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

const useClientHeight = () => {
  const [contentWrapHeight, setContentWrapHeight] = useState<string>()

  const contentWrapRef = useCallback((node: HTMLElement) => {
    if (node !== null) {
      setContentWrapHeight(node.clientHeight + 'px')
    }
  }, [])

  return { contentWrapHeight, contentWrapRef }
}

// See - https://mui.com/material-ui/guides/composition/#with-typescript
interface TypographyWithComponentProps<Comp extends ElementType = ElementType> extends TypographyProps {
  component?: Comp
  ellipsisPosition?: 'start' | 'end'
}

export interface EllipsizeBoxProps extends BoxProps {
  typographyProps?: TypographyWithComponentProps
  ellipsisPosition?: 'start' | 'end'
}

export const EllipsizeBoxInner: React.FC<WithChildren<EllipsizeBoxProps>> = forwardRef(
  ({ children, ellipsisPosition = 'start', typographyProps, ...props }, ref) => {
    // Allow syncing of :before pseudo element height with contentWrapHeight
    const { contentWrapRef, contentWrapHeight } = useClientHeight()

    return (
      <EllipsizeRoot beforeLineHeight={ref ? contentWrapHeight : undefined} ref={ref} {...props}>
        <EllipsizeInnerWrap>
          <EllipsizeContentWrap ref={contentWrapRef} component={'span'} ellipsisPosition={ellipsisPosition} variant="body2" {...typographyProps}>
            {children}
          </EllipsizeContentWrap>
        </EllipsizeInnerWrap>
      </EllipsizeRoot>
    )
  },
)

EllipsizeBoxInner.displayName = 'EllipsizeBox'
export const EllipsizeBox = EllipsizeBoxInner
