import { ModuleError, ModuleErrorSchema } from '@xyo-network/module'
import { Component, ErrorInfo, ReactNode } from 'react'
import Rollbar from 'rollbar'

import { XyoErrorRender } from '../XyoErrorRender'

export interface XyoErrorBoundaryProps {
  boundaryName?: string
  children: ReactNode
  errorComponent?: (e: ModuleError, boundaryName?: string) => ReactNode
  rethrow?: boolean
  rollbar?: Rollbar
}

export interface XyoErrorBoundaryState {
  xyoError?: ModuleError
}

export class XyoThrownErrorBoundary extends Component<XyoErrorBoundaryProps, XyoErrorBoundaryState> {
  public override state: XyoErrorBoundaryState = {
    xyoError: undefined,
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, xyoError: XyoThrownErrorBoundary.normalizeError(error) } as XyoErrorBoundaryState
  }

  public static normalizeError(error: Error | ModuleError): ModuleError {
    return (
      (error as ModuleError).schema === ModuleErrorSchema ? error : { message: error.message, schema: ModuleErrorSchema, sources: [] }
    ) as ModuleError
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
