import { useRollbar } from '@rollbar/react'
import type { ModuleError } from '@xyo-network/payload-model'
import { ModuleErrorSchema } from '@xyo-network/payload-model'
import type {
  ErrorInfo, FC, ReactNode,
} from 'react'
import React, { Component } from 'react'
import type Rollbar from 'rollbar'

import { useErrorReporter } from '../../contexts/index.ts'
import { ErrorRender } from '../ErrorRender/index.ts'

export interface ThrownErrorBoundaryProps {
  boundaryName?: string
  children: ReactNode
  errorComponent?: (e: ModuleError, boundaryName?: string) => ReactNode
  rethrow?: boolean
  rollbar?: Rollbar
  scope?: string
  title?: string
}

export interface ThrownErrorBoundaryState {
  xyoError?: ModuleError
}

class ThrownErrorBoundaryInner extends Component<ThrownErrorBoundaryProps, ThrownErrorBoundaryState> {
  override state: ThrownErrorBoundaryState = { xyoError: undefined }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, xyoError: ThrownErrorBoundaryInner.normalizeError(error) } as ThrownErrorBoundaryState
  }

  static normalizeError(error: Error | ModuleError): ModuleError {
    return (
      (error as ModuleError).schema === ModuleErrorSchema
        ? error
        : {
            message: error.message, schema: ModuleErrorSchema, sources: [],
          }) as ModuleError
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
    const {
      children, boundaryName, errorComponent, scope, title,
    } = this.props
    if (xyoError) {
      if (errorComponent) {
        return errorComponent(xyoError)
      }
      return <ErrorRender error={xyoError} errorContext={`${boundaryName} Boundary`} scope={scope} title={title} />
    }

    return children
  }
}

// calling the hook outside of the component since only can be called in functional component
export const ThrownErrorBoundary: FC<ThrownErrorBoundaryProps> = ({ rollbar, ...props }) => {
  const { rollbar: rollbarErrorReporter } = useErrorReporter()
  let rollbarFromHook: Rollbar | undefined
  // safely call the hook
  try {
    rollbarFromHook = useRollbar()
  } catch {}
  return <ThrownErrorBoundaryInner rollbar={rollbar ?? rollbarErrorReporter ?? rollbarFromHook} {...props} />
}
