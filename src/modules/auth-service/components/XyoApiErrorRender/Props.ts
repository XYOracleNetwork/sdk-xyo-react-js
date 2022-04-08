import { FlexBoxProps } from '@xylabs/sdk-react'
import { XyoApiError, XyoApiResponse } from '@xyo-network/sdk-xyo-client-js'
import { ReactNode } from 'react'

export interface XyoApiErrorRenderProps extends FlexBoxProps {
  apiError?: XyoApiError
  apiFailure?: XyoApiResponse
  customError?: ReactNode
  noReAuth?: boolean
  noErrorDisplay?: boolean
}
