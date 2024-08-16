import type { FlexBoxProps } from '@xylabs/react-flexbox'
import type { ModuleError } from '@xyo-network/payload-model'
import type { ReactNode } from 'react'
import type { Location } from 'react-router-dom'

export interface ErrorRenderProps extends FlexBoxProps {
  customError?: ReactNode
  error?: ModuleError | Error
  errorContext?: string
  noErrorDisplay?: boolean
  noReAuth?: boolean
  onCancel?: () => void
  scope?: string
  useLocation?: () => Location
}
