import { FlexBoxProps } from '@xylabs/react-flexbox'
import { XyoApiError, XyoApiResponse } from '@xyo-network/api'
import { ReactElement, ReactNode } from 'react'

export interface XyoApiErrorRenderProps extends FlexBoxProps {
  apiError?: XyoApiError
  apiFailure?: XyoApiResponse
  customError?: ReactNode
  noReAuth?: boolean
  noErrorDisplay?: boolean
  children?: ReactElement
}
