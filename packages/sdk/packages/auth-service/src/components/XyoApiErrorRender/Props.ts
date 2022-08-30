import { FlexBoxProps } from '@xylabs/react-flexbox'
import { XyoApiError, XyoApiResponse } from '@xyo-network/api'
import { ReactNode } from 'react'

export interface XyoApiErrorRenderProps extends FlexBoxProps {
  apiError?: XyoApiError | Error
  apiFailure?: XyoApiResponse
  customError?: ReactNode
  noReAuth?: boolean
  noErrorDisplay?: boolean
}
