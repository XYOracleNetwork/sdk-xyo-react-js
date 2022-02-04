import { FlexBoxProps } from '@xylabs/sdk-react'
import { ReactNode } from 'react'

import { PropertyAction } from './PropertyAction'

interface PropertyProps extends FlexBoxProps {
  actions?: PropertyAction[]
  maxTitleWidth?: number
  required?: boolean
  tip?: ReactNode
  title?: string
  value?: string | number | boolean | null
}

export type { PropertyProps }
