import { FlexBoxProps } from '@xylabs/react-flexbox'
import { ModuleError } from '@xyo-network/payload-model'
import { ReactNode } from 'react'

export interface ErrorRenderProps extends FlexBoxProps {
  customError?: ReactNode
  error?: ModuleError | Error
  errorContext?: string
  noErrorDisplay?: boolean
  noReAuth?: boolean
  onCancel?: () => void
}
