import { FlexBoxProps } from '@xylabs/react-flexbox'
import { XyoError } from '@xyo-network/module'
import { ReactNode } from 'react'

export interface XyoErrorRenderProps extends FlexBoxProps {
  customError?: ReactNode
  error?: XyoError | Error
  errorContext?: string
  noErrorDisplay?: boolean
  noReAuth?: boolean
}
