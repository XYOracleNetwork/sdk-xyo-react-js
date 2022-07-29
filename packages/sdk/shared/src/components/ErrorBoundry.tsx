import { Typography } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { Component, ErrorInfo, ReactNode } from 'react'

export interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
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

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`${error}: ${errorInfo}`)
  }

  render() {
    if (this.state.error) {
      return (
        this.props.fallback ?? (
          <FlexCol>
            <Typography variant="h1">Something went wrong.</Typography>
            <Typography variant="body1">[{this.state.error?.message}]</Typography>
          </FlexCol>
        )
      )
    }

    return this.props.children
  }
}
