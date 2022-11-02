import { BasePageProps } from '@xylabs/react-common'
import { XyoError, XyoErrorSchema } from '@xyo-network/module'
import { Component, ErrorInfo, ReactNode } from 'react'
import Rollbar from 'rollbar'

import { XyoErrorRender } from '../XyoErrorRender'

export interface XyoErrorBoundaryProps {
  rethrow?: boolean
  children: ReactNode
  rollbar?: Rollbar
  basePageProps?: BasePageProps
  errorComponent?: (e: Error) => ReactNode
}

export interface XyoErrorBoundaryState {
  xyoError?: XyoError
}

export class XyoThrownErrorBoundary extends Component<XyoErrorBoundaryProps, XyoErrorBoundaryState> {
  public state: XyoErrorBoundaryState = {
    xyoError: undefined,
  }

  public static normalizeError(error: Error | XyoError): XyoError {
    return ((error as XyoError).schema === XyoErrorSchema ? error : { message: error.message, schema: XyoErrorSchema, sources: [] }) as XyoError
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { rethrow, rollbar } = this.props
    const xyoError = XyoThrownErrorBoundary.normalizeError(error)

    rollbar?.error(error)

    console.error('XyoError:', xyoError, errorInfo)
    if (rethrow) {
      throw error
    }
  }

  public render() {
    const { xyoError } = this.state
    const { children } = this.props
    if (xyoError) {
      return <XyoErrorRender xyoError={xyoError} />
    }

    return children
  }
}
