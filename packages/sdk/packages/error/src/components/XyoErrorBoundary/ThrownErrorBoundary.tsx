import { BasePageProps } from '@xylabs/react-common'
import { XyoError, XyoErrorSchema } from '@xyo-network/module'
import { Component, ErrorInfo, ReactNode } from 'react'
import Rollbar from 'rollbar'

import { XyoErrorRender } from '../XyoErrorRender'

export interface XyoErrorBoundaryProps {
  basePageProps?: BasePageProps
  boundaryName?: string
  children: ReactNode
  errorComponent?: (e: XyoError, boundaryName?: string) => ReactNode
  rethrow?: boolean
  rollbar?: Rollbar
}

export interface XyoErrorBoundaryState {
  xyoError?: XyoError
}

export class XyoThrownErrorBoundary extends Component<XyoErrorBoundaryProps, XyoErrorBoundaryState> {
  public override state: XyoErrorBoundaryState = {
    xyoError: undefined,
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, xyoError: XyoThrownErrorBoundary.normalizeError(error) } as XyoErrorBoundaryState
  }

  public static normalizeError(error: Error | XyoError): XyoError {
    return ((error as XyoError).schema === XyoErrorSchema ? error : { message: error.message, schema: XyoErrorSchema, sources: [] }) as XyoError
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { rethrow, rollbar } = this.props
    const { xyoError } = this.state

    rollbar?.error(error)

    console.error('XyoError:', xyoError, errorInfo)
    if (rethrow) {
      throw error
    }
  }

  public override render() {
    const { xyoError } = this.state
    const { children, boundaryName, errorComponent } = this.props
    if (xyoError) {
      if (errorComponent) {
        return errorComponent(xyoError)
      }
      return <XyoErrorRender error={xyoError} errorContext={`${boundaryName} Boundary`} />
    }

    return children
  }
}
