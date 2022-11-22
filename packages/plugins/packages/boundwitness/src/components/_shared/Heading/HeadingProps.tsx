import { TypographyProps } from '@mui/material'
import { ReactNode } from 'react'

export type HeadingTextSizes = 'small' | 'medium' | 'large'

export interface BWHeadingProps {
  heading?: string
  size?: HeadingTextSizes
  AdornmentStart?: ReactNode
  AdornmentEnd?: ReactNode
  fallbackText?: string
  IconComponent?: ReactNode
  headingProps?: TypographyProps
}
