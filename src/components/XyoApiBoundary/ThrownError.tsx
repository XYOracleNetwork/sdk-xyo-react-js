import { XyoApiError } from '@xyo-network/sdk-xyo-client-js'
import { Component, ErrorInfo, ReactNode } from 'react'

import { XyoApiErrorRender } from '../../modules'

export interface XyoApiErrorBoundaryProps {
  rethrow?: boolean
  children: ReactNode
}

export interface XyoApiErrorBoundaryState {
  xyoApiError?: XyoApiError
}

export class XyoApiThrownErrorBoundary extends Component<XyoApiErrorBoundaryProps, XyoApiErrorBoundaryState> {
  public state: XyoApiErrorBoundaryState = {
    xyoApiError: undefined,
  }

  public static getDerivedStateFromError(error: Error): XyoApiErrorBoundaryState {
    const xyoApiError = error as XyoApiError
    if (xyoApiError.isAxiosError) {
      return { xyoApiError }
    } else {
      return {}
    }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { rethrow } = this.props
    const xyoApiError = error as XyoApiError
    if (xyoApiError.isXyoError) {
      console.error('XyoApiError:', xyoApiError, errorInfo)
      if (rethrow) {
        throw error
      }
    } else {
      throw error
    }
  }

  public render() {
    const { xyoApiError } = this.state
    const { children } = this.props
    if (xyoApiError) {
      return <XyoApiErrorRender apiError={xyoApiError} />
    }

    return children
  }
}
