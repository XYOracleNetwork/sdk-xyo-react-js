import { useRollbar } from '@rollbar/react'
import type { ErrorInfo, ReactNode } from 'react'
import React, { Component } from 'react'
import type Rollbar from 'rollbar'

import { useErrorReporter } from '../../contexts/index.ts'
import { ErrorRender } from '../ErrorRender/index.ts'

/** @deprecated use from @xylabs/react-error instead */
export type ErrorEx<T = void> = T extends void ? Error : T | Error

/** @deprecated use from @xylabs/react-error instead */
export interface ThrownErrorBoundaryProps<T = void> {
  boundaryName?: string
  children: ReactNode
  errorComponent?: (e: ErrorEx<T>, boundaryName?: string) => ReactNode
  rethrow?: boolean
  rollbar?: Rollbar
  scope?: string
  title?: string
}

/** @deprecated use from @xylabs/react-error instead */
export interface ThrownErrorBoundaryState<T = void> {
  errorEx?: ErrorEx<T>
}

class ThrownErrorBoundaryInner<T> extends Component<ThrownErrorBoundaryProps<T>, ThrownErrorBoundaryState<T>> {
  override state: ThrownErrorBoundaryState<T> = { errorEx: undefined }

  static getDerivedStateFromError<T = void>(error: ErrorEx<T>) {
    return { hasError: true, xyoError: ThrownErrorBoundaryInner.normalizeError<T>(error) } as ThrownErrorBoundaryState<T>
  }

  static normalizeError<T>(_error: ErrorEx<T>): T {
    throw new Error('Method not implemented.')
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { rethrow, rollbar } = this.props
    const { errorEx } = this.state

    rollbar?.error(error)

    console.error('Error:', errorEx, errorInfo)
    if (rethrow) {
      throw error
    }
  }

  override render() {
    const { errorEx } = this.state
    const {
      children, boundaryName, errorComponent, scope, title,
    } = this.props
    if (errorEx) {
      if (errorComponent) {
        return errorComponent(errorEx)
      }
      return <ErrorRender<T> error={errorEx} errorContext={`${boundaryName} Boundary`} scope={scope} title={title} />
    }

    return children
  }
}

// calling the hook outside of the component since only can be called in functional component
/** @deprecated use from @xylabs/react-error instead */
export function ThrownErrorBoundaryBase<T = void>({ rollbar, ...props }: ThrownErrorBoundaryProps<T>): React.JSX.Element {
  const { rollbar: rollbarErrorReporter } = useErrorReporter()
  let rollbarFromHook: Rollbar | undefined
  // safely call the hook
  try {
    rollbarFromHook = useRollbar()
  } catch {}
  return <ThrownErrorBoundaryInner<T> rollbar={rollbar ?? rollbarErrorReporter ?? rollbarFromHook} {...props} />
}
