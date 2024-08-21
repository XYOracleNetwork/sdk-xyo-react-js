import type { TypographyVariant } from '@mui/material'
import { FlexGrowRow } from '@xylabs/react-flexbox'
import { EllipsizeBox } from '@xyo-network/react-shared'
import React, { useRef } from 'react'

import type { BWHeadingProps, HeadingTextSizes } from './HeadingProps.tsx'

export const BWHeading: React.FC<BWHeadingProps> = ({
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
        title={headingText}
        width="100%"
        typographyProps={{
          variant: sizeParser(size), ...headingProps,
        }}
        ref={ellipsizeRef}
      >
        {headingText}
      </EllipsizeBox>
      {AdornmentEnd}
    </FlexGrowRow>
  )
}
