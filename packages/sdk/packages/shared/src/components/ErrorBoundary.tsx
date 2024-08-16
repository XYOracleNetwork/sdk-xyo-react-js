import { Typography } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import type { ErrorInfo, ReactNode } from 'react'
import React, { Component } from 'react'

export interface ErrorBoundaryProps {
  children: ReactNode
  // fallback as a static ReactNode value
  fallback?: ReactNode
  // fallback element that can receive the error as a prop
  fallbackWithError?: (error: Error) => ReactNode
  scope?: string
}

export interface ErrorBoundaryState {
  error?: Error
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { error: undefined }
  }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`${error}: ${errorInfo}`)
  }

  override render() {
    if (this.state.error) {
      if (this.props.fallbackWithError) {
        return this.props.fallbackWithError(this.state.error)
      }
      return (
        this.props.fallback ?? (
          <FlexCol>
            <Typography variant="h1">Something went wrong.</Typography>
            {this.props.scope && (
              <Typography variant="h2">
                [
                {this.props.scope}
                ]
              </Typography>
            )}
            <Typography variant="body1">
              [
              {this.state.error?.message}
              ]
            </Typography>
          </FlexCol>
        )
      )
    }

    return this.props.children
  }
}
