import { ModuleError, ModuleErrorSchema } from '@xyo-network/payload-model'
import { Component, ErrorInfo, ReactNode } from 'react'
import Rollbar from 'rollbar'

import { ErrorRender } from '../ErrorRender'

export interface ThrownErrorBoundaryProps {
  boundaryName?: string
  children: ReactNode
  errorComponent?: (e: ModuleError, boundaryName?: string) => ReactNode
  rethrow?: boolean
  rollbar?: Rollbar
}

export interface ThrownErrorBoundaryState {
  xyoError?: ModuleError
}

export class ThrownErrorBoundary extends Component<ThrownErrorBoundaryProps, ThrownErrorBoundaryState> {
  override state: ThrownErrorBoundaryState = {
    xyoError: undefined,
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, xyoError: ThrownErrorBoundary.normalizeError(error) } as ThrownErrorBoundaryState
  }

  static normalizeError(error: Error | ModuleError): ModuleError {
    return (
      (error as ModuleError).schema === ModuleErrorSchema ?
        error
      : { message: error.message, schema: ModuleErrorSchema, sources: [] }) as ModuleError
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { rethrow, rollbar } = this.props
    const { xyoError } = this.state

    rollbar?.error(error)

    console.error('Error:', xyoError, errorInfo)
    if (rethrow) {
      throw error
    }
  }

  override render() {
    const { xyoError } = this.state
    const { children, boundaryName, errorComponent } = this.props
    if (xyoError) {
      if (errorComponent) {
        return errorComponent(xyoError)
      }
      return <ErrorRender error={xyoError} errorContext={`${boundaryName} Boundary`} />
    }

    return children
  }
}
