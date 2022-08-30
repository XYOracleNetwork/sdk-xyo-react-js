import { Alert, AlertTitle } from '@mui/material'
import { BasePage, BasePageProps } from '@xylabs/react-common'
import { XyoApiError } from '@xyo-network/api'
import { Component, ErrorInfo, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Rollbar from 'rollbar'

import { XyoApiErrorRender } from '../XyoApiErrorRender'

const DefaultErrorPage: React.FC<{ basePageProps: XyoApiErrorBoundaryProps['basePageProps'] }> = ({ basePageProps }) => {
  return (
    <BasePage {...basePageProps}>
      <Alert severity="error">
        <AlertTitle>Oops. An error occurred!</AlertTitle>
        Try to go <Link to="/">Home</Link> or refresh your browser.
      </Alert>
    </BasePage>
  )
}

export interface XyoApiErrorBoundaryProps {
  rethrow?: boolean
  children: ReactNode
  rollbar?: Rollbar
  basePageProps?: BasePageProps
  errorComponent?: (e: Error) => ReactNode
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
    const { children, basePageProps, errorComponent } = this.props
    if (xyoApiError) {
      return <XyoApiErrorRender apiError={xyoApiError} />
    } else if (error) {
      return <>{errorComponent ? errorComponent(error) : <DefaultErrorPage basePageProps={basePageProps} />}</>
    }

    return children
  }
}
