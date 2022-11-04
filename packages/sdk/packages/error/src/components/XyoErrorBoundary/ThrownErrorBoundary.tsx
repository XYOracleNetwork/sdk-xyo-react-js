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
  errorComponent?: (e: XyoError, boundaryName?: string) => ReactNode
  boundaryName?: string
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

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, xyoError: XyoThrownErrorBoundary.normalizeError(error) } as XyoErrorBoundaryState
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { rethrow, rollbar } = this.props
    const { xyoError } = this.state

    rollbar?.error(error)

    console.error('XyoError:', xyoError, errorInfo)
    if (rethrow) {
      throw error
    }
  }

  public render() {
    const { xyoError } = this.state
    const { children, boundaryName, errorComponent } = this.props
    if (xyoError) {
      if (errorComponent) {
        return errorComponent(xyoError)
      }
      return <XyoErrorRender xyoError={xyoError} errorContext={`${boundaryName} Boundary`} />
    }

    return children
  }
}
