import { FlexBoxProps } from '@xylabs/react-flexbox'
import { XyoError } from '@xyo-network/module'
import { ReactNode } from 'react'

export interface XyoErrorRenderProps extends FlexBoxProps {
  customError?: ReactNode
  errorContext?: string
  noErrorDisplay?: boolean
  noReAuth?: boolean
  xyoError?: XyoError
}
