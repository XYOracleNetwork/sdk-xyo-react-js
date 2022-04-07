import { FlexBoxProps } from '@xylabs/sdk-react'
import { AxiosError, AxiosResponse } from 'axios'
import { ReactNode } from 'react'

export interface AxiosErrorRenderProps extends FlexBoxProps {
  apiError?: AxiosError
  apiFailure?: AxiosResponse
  customError?: ReactNode
  noReAuth?: boolean
  noErrorDisplay?: boolean
}
