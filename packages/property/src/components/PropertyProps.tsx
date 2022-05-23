import { FlexBoxProps } from '@xylabs/sdk-react'
import { SizeProp } from '@xyo-network/react-shared'
import { ReactNode } from 'react'

import { PropertyAction } from './PropertyAction'

export interface PropertyProps extends FlexBoxProps {
  actions?: PropertyAction[]
  required?: boolean
  tip?: ReactNode
  title?: string
  value?: string | number | boolean | null
  badge?: boolean
  size?: SizeProp
}
