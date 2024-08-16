import type { TypographyProps } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import type { ReactNode } from 'react'

export type HeadingTextSizes = 'small' | 'medium' | 'large'

export interface BWHeadingProps extends FlexBoxProps {
  AdornmentEnd?: ReactNode
  AdornmentStart?: ReactNode
  IconComponent?: ReactNode
  fallbackText?: string
  heading?: string
  headingProps?: TypographyProps
  size?: HeadingTextSizes
}
