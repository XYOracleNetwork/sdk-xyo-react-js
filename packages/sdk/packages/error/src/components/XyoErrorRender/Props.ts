import { FlexBoxProps } from '@xylabs/react-flexbox'
import { ModuleError } from '@xyo-network/module'
import { ReactNode } from 'react'

export interface XyoErrorRenderProps extends FlexBoxProps {
  customError?: ReactNode
  error?: ModuleError | Error
  errorContext?: string
  noErrorDisplay?: boolean
  noReAuth?: boolean
}
