import { FlexBoxProps } from '@xylabs/react-flexbox'
import { XyoError } from '@xyo-network/module'
import { ReactNode } from 'react'

export interface XyoErrorRenderProps extends FlexBoxProps {
  xyoError?: XyoError
  customError?: ReactNode
  noReAuth?: boolean
  noErrorDisplay?: boolean
  errorContext?: string
}
