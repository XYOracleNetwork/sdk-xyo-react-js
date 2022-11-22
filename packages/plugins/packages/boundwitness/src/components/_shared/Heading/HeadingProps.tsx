import { TypographyProps } from '@mui/material'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { ReactNode } from 'react'

export type HeadingTextSizes = 'small' | 'medium' | 'large'

export interface BWHeadingProps extends FlexBoxProps {
  heading?: string
  size?: HeadingTextSizes
  AdornmentStart?: ReactNode
  AdornmentEnd?: ReactNode
  fallbackText?: string
  IconComponent?: ReactNode
  headingProps?: TypographyProps
}
