import { FlexBoxProps } from '@xylabs/sdk-react'
import { ReactNode } from 'react'

import { PropertyAction } from './PropertyAction'
import { SizeProp } from './SizeProp'

export interface PropertyProps extends FlexBoxProps {
  actions?: PropertyAction[]
  required?: boolean
  tip?: ReactNode
  title?: string
  value?: string | number | boolean | null
  badge?: boolean
  size?: SizeProp
}
