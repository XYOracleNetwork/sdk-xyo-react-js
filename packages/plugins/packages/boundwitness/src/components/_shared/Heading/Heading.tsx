import type { TypographyVariant } from '@mui/material'
import { FlexGrowRow } from '@xylabs/react-flexbox'
import { EllipsizeBox } from '@xyo-network/react-shared'
import React, { useRef } from 'react'

import type { HeadingFlexboxProps, HeadingTextSizes } from './HeadingProps.tsx'

export const HeadingFlexbox: React.FC<HeadingFlexboxProps> = ({
  AdornmentEnd,
  AdornmentStart,
  heading,
  headingProps,
  IconComponent,
  size = 'medium',
  fallbackText = 'No heading Provided',
  ...props
}) => {
  const ellipsizeRef = useRef<HTMLDivElement | null>(null)
  const headingText = heading ?? fallbackText

  const sizeParser = (size: HeadingTextSizes) => {
    const map: Record<HeadingTextSizes, TypographyVariant> = {
      large: 'h4',
      medium: 'body1',
      small: 'caption',
    }
    const mappedSize = map[size]
    if (mappedSize === undefined) {
      throw new Error(`${size} is not a recognized TextSize`)
    }
    return mappedSize
  }

  return (
    <FlexGrowRow columnGap={2} {...props}>
      {AdornmentStart}
      {IconComponent}
      <EllipsizeBox
        innerWrapProps={{ sx: { alignItems: 'unset' } }}
        title={headingText}
        width="100%"
        typographyProps={{ variant: sizeParser(size), ...headingProps }}
        ref={ellipsizeRef}
      >
        {headingText}
      </EllipsizeBox>
      {AdornmentEnd}
    </FlexGrowRow>
  )
}

/** @deprecated - use HeadingFlexbox instead */
export const BWHeading = HeadingFlexbox
