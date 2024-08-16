import type { PaperProps } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import type { SizeProp } from '@xyo-network/react-shared'
import type { ReactNode } from 'react'

import type { PropertyAction } from './Action.ts'
import type { PropertyTitleProps } from './Title.tsx'

export interface PropertyBaseProps {
  paper?: boolean
  tip?: ReactNode
  title?: string
  titleProps?: PropertyTitleProps
}

export type PropertyFieldBaseProps = PropertyBaseProps & {
  actions?: PropertyAction[]
  badge?: boolean
  required?: boolean
  size?: SizeProp
  value?: string | number | boolean | null
}

export type PropertyBoxProps = PropertyFieldBaseProps &
  FlexBoxProps & {
    paper?: false
  }

export type PropertyPaperProps = PropertyFieldBaseProps &
  PaperProps & {
    paper: true
  }

export type PropertyProps = PropertyBoxProps | PropertyPaperProps

export type PropertyGroupBaseProps = PropertyBaseProps

export type PropertyGroupBoxProps = PropertyGroupBaseProps &
  FlexBoxProps & {
    paper?: false
  }

export type PropertyGroupPaperProps = PropertyGroupBaseProps &
  PaperProps & {
    paper: true
  }

export type PropertyGroupProps = PropertyGroupBoxProps | PropertyGroupPaperProps
