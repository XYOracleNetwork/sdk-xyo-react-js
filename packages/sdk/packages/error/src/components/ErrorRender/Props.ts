import type { FlexBoxProps } from '@xylabs/react-flexbox'
import type { ReactNode } from 'react'
import type { Location } from 'react-router-dom'

export type ErrorEx<T = void> = T extends void ? Error : T | Error

export interface ErrorRenderProps<T = void> extends FlexBoxProps {
  customError?: ReactNode
  error?: ErrorEx<T>
  errorContext?: string
  noErrorDisplay?: boolean
  noReAuth?: boolean
  onCancel?: () => void
  scope?: string
  useLocation?: () => Location
}
