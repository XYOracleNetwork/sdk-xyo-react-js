import { FlexBoxProps } from '@xylabs/sdk-react'
import { SizeProp } from '@xyo-network/react-shared'
import { ReactNode } from 'react'

import { PropertyAction } from './PropertyAction'

export interface PropertyBaseProps extends FlexBoxProps {
  tip?: ReactNode
  title?: string
  color?: 'primary' | 'secondary' | string
  variant?: 'outlined' | 'default'
}
export interface PropertyProps extends PropertyBaseProps {
  actions?: PropertyAction[]
  required?: boolean
  value?: string | number | boolean | null
  badge?: boolean
  size?: SizeProp
}

export type PropertyGroupProps = PropertyBaseProps
