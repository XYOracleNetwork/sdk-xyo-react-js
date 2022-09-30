import { Box, BoxProps, styled, Typography, TypographyProps } from '@mui/material'
import { WithChildren } from '@xylabs/react-shared'
import React, { ElementType, useCallback, useState } from 'react'

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
  slot: 'contentWrap',
})<TypographyWithComponentProps>(() => ({
  fontFamily: 'monospace',
  left: 0,
  overflow: 'hidden',
  position: 'absolute',
  right: 0,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}))

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
}

export interface EllipsizeBoxProps extends BoxProps {
  typographyProps?: TypographyWithComponentProps
}

export const EllipsizeBox: React.FC<WithChildren<EllipsizeBoxProps>> = ({ children, typographyProps, ...props }) => {
  // Allow syncing of :before pseudo element height with contentWrapHeight
  const { contentWrapRef, contentWrapHeight } = useClientHeight()

  return (
    <EllipsizeRoot beforeLineHeight={contentWrapHeight} {...props}>
      <EllipsizeInnerWrap>
        <EllipsizeContentWrap ref={contentWrapRef} component={'span'} {...typographyProps}>
          {children}
        </EllipsizeContentWrap>
      </EllipsizeInnerWrap>
    </EllipsizeRoot>
  )
}
