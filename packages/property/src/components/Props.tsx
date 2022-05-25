import { PaperProps } from '@mui/material'
import { FlexBoxProps } from '@xylabs/sdk-react'
import { SizeProp } from '@xyo-network/react-shared'
import { ReactNode } from 'react'

import { PropertyAction } from './Action'
import { PropertyTitleProps } from './Title'

export interface PropertyBaseProps {
  tip?: ReactNode
  title?: string
  paper?: boolean
  titleProps?: PropertyTitleProps
}

export type PropertyFieldBaseProps = PropertyBaseProps & {
  actions?: PropertyAction[]
  required?: boolean
  value?: string | number | boolean | null
  badge?: boolean
  size?: SizeProp
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
