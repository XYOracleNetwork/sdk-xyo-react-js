import { Breakpoint, GridProps } from '@mui/material'
import { FlexBoxProps } from '@xylabs/sdk-react'
import { ReactNode } from 'react'

import { PropertyAction } from './PropertyAction'

export interface PropertyProps extends FlexBoxProps {
  actions?: PropertyAction[]
  maxTitleWidth?: number
  required?: boolean
  tip?: ReactNode
  title?: string
  value?: string | number | boolean | null
  paddingFactor?: number
  hero?: boolean
  badge?: boolean
  size?: 'small' | 'medium'
  stackBreak?: Breakpoint
  gridContainerProps?: GridProps
}
