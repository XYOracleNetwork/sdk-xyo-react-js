import { PaperProps } from '@mui/material'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { SizeProp } from '@xyo-network/react-shared'
import { ReactNode } from 'react'

import { PropertyAction } from './Action.ts'
import { PropertyTitleProps } from './Title.tsx'

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
