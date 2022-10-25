import { FlexBoxProps } from '@xylabs/react-flexbox'
import { XyoApiError, XyoApiResponse } from '@xyo-network/api'
import { XyoError } from '@xyo-network/module'
import { ReactNode } from 'react'

export interface XyoApiErrorRenderProps extends FlexBoxProps {
  apiError?: XyoApiError | XyoError | Error
  apiFailure?: XyoApiResponse
  customError?: ReactNode
  noReAuth?: boolean
  noErrorDisplay?: boolean
}
