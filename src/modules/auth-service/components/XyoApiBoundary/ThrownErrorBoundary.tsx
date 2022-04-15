import { Alert, AlertTitle } from '@mui/material'
import { BasePage } from '@xylabs/sdk-react'
import { XyoApiError } from '@xyo-network/sdk-xyo-client-js'
import { Component, ErrorInfo, ReactNode } from 'react'
import Rollbar from 'rollbar'

import { XyoApiErrorRender } from '../XyoApiErrorRender'

export interface XyoApiErrorBoundaryProps {
  rethrow?: boolean
  children: ReactNode
  rollbar?: Rollbar
}

export interface XyoApiErrorBoundaryState {
  xyoApiError?: XyoApiError
  error?: Error
}

export class XyoApiThrownErrorBoundary extends Component<XyoApiErrorBoundaryProps, XyoApiErrorBoundaryState> {
  public state: XyoApiErrorBoundaryState = {
    error: undefined,
    xyoApiError: undefined,
  }

  public static getDerivedStateFromError(error: Error): XyoApiErrorBoundaryState {
    const xyoApiError = error as XyoApiError
    if (xyoApiError.isXyoError) {
      return { xyoApiError }
    } else {
      return { error }
    }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { rethrow, rollbar } = this.props
    const xyoApiError = error as XyoApiError

    rollbar?.error(error)

    if (xyoApiError.isXyoError) {
      console.error('XyoApiError:', xyoApiError, errorInfo)
      if (rethrow) {
        throw error
      }
    } else {
      if (rethrow) {
        throw error
      }
    }
  }

  public render() {
    const { xyoApiError, error } = this.state
    const { children, ...basePageProps } = this.props
    if (xyoApiError) {
      return <XyoApiErrorRender apiError={xyoApiError} />
    } else if (error) {
      return (
        <BasePage {...basePageProps}>
          <Alert severity="error">
            <AlertTitle>Oops. An error occurred!</AlertTitle>
            Please refresh your browser.
          </Alert>
        </BasePage>
      )
    }

    return children
  }
}
